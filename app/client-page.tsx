"use client"

import { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileUp, Code, Eye, FileDown, AlertTriangle, Wand2, Lightbulb, Settings } from "lucide-react"
import ReactToPrint from "react-to-print"
import dynamic from "next/dynamic"
import FileUploader from "@/components/file-uploader"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Dynamically import components that might cause SSR issues
const CodeEditor = dynamic(() => import("@/components/code-editor"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-md"></div>,
})

const CodePreview = dynamic(() => import("@/components/code-preview"), {
  ssr: false,
  loading: () => <div className="text-center py-4">Loading component preview...</div>,
})

const ErrorCorrection = dynamic(() => import("@/components/error-correction"), {
  ssr: false,
})

const FeatureRequestDialog = dynamic(() => import("@/components/feature-request-dialog"), {
  ssr: false,
})

const PrintSettingsDialog = dynamic(() => import("@/components/print-settings-dialog"), {
  ssr: false,
})

export default function ClientPage() {
  const [code, setCode] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("component.tsx")
  const previewRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<string>("upload")
  const [previewReady, setPreviewReady] = useState<boolean>(false)
  const [isAnalyzingError, setIsAnalyzingError] = useState<boolean>(false)
  const [suggestedFix, setSuggestedFix] = useState<string | null>(null)
  const [isFeatureRequestOpen, setIsFeatureRequestOpen] = useState<boolean>(false)
  const [isPrintSettingsOpen, setIsPrintSettingsOpen] = useState<boolean>(false)
  const [printSettings, setPrintSettings] = useState({
    pageSize: "a4",
    orientation: "portrait",
    margins: "normal",
    scale: 1,
  })
  const { toast } = useToast()

  const handleCodeChange = (value: string) => {
    setCode(value)
    setError(null)
    setSuggestedFix(null)
  }

  const handleFileUpload = (content: string, name: string) => {
    setCode(content)
    setFileName(name)
    setError(null)
    setSuggestedFix(null)
  }

  // Improved validation function that's more lenient with JSX
  const validateCode = (code: string): { isValid: boolean; error?: string } => {
    try {
      // Skip validation for empty code
      if (!code.trim()) {
        return { isValid: false, error: "Please enter or upload some TSX code first" }
      }

      // Skip strict bracket validation as it can cause false positives with JSX
      // Instead, we'll let the preview component handle rendering errors

      return { isValid: true }
    } catch (err) {
      return { isValid: false, error: err instanceof Error ? err.message : "Invalid TSX code" }
    }
  }

  const handlePreviewClick = () => {
    const validation = validateCode(code)

    if (!validation.isValid) {
      setError(validation.error)
      setPreviewReady(false)
      return
    }

    // Always set preview ready to true - we'll let the CodePreview component handle errors
    setPreviewReady(true)
    setError(null)
  }

  const handleErrorAnalysis = async () => {
    if (!error) return

    setIsAnalyzingError(true)
    setSuggestedFix(null)

    try {
      const response = await fetch("/api/analyze-error", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          error,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze error")
      }

      const data = await response.json()
      setSuggestedFix(data.fixedCode)

      toast({
        title: "Error Analysis Complete",
        description: "AI has suggested a fix for your code.",
        duration: 3000,
      })
    } catch (err) {
      console.error("Error during analysis:", err)
      toast({
        title: "Error Analysis Failed",
        description: err instanceof Error ? err.message : "Failed to analyze error",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsAnalyzingError(false)
    }
  }

  const applyFix = () => {
    if (suggestedFix) {
      setCode(suggestedFix)
      setSuggestedFix(null)
      setError(null)
      toast({
        title: "Fix Applied",
        description: "The suggested fix has been applied to your code.",
        duration: 3000,
      })
    }
  }

  const handlePrintError = () => {
    toast({
      title: "PDF Generation Error",
      description: "There was an error generating the PDF. Please check your component for errors.",
      variant: "destructive",
      duration: 3000,
    })
  }

  const updatePrintSettings = (settings) => {
    setPrintSettings(settings)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">TSX to PDF Converter</h1>
          <p className="text-muted-foreground mt-2">
            Upload TSX code, preview the rendered component, and download as PDF
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsPrintSettingsOpen(true)} className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>PDF Settings</span>
          </Button>
          <Button variant="outline" onClick={() => setIsFeatureRequestOpen(true)} className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>Request Feature</span>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <FileUp className="h-4 w-4" />
              <span>Upload File</span>
            </TabsTrigger>
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Code Editor</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload TSX File</CardTitle>
                <CardDescription>
                  Upload a TSX file containing a React component to render and convert to PDF
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploader onFileUpload={handleFileUpload} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="editor" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>TSX Code Editor</CardTitle>
                <CardDescription>Write or paste your TSX code here to render and convert to PDF</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full border rounded-md overflow-hidden">
                  <CodeEditor value={code} onChange={handleCodeChange} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error in your code</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <div className="mt-2">
              {isAnalyzingError ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  Analyzing error and suggesting fixes...
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={handleErrorAnalysis} className="flex items-center gap-2">
                  <Wand2 className="h-3 w-3" />
                  Analyze Error
                </Button>
              )}
            </div>
          </Alert>
        )}

        {suggestedFix && <ErrorCorrection originalCode={code} fixedCode={suggestedFix} onApplyFix={applyFix} />}

        <div className="flex justify-center gap-4">
          <Button onClick={handlePreviewClick} className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>Preview Component</span>
          </Button>

          <ReactToPrint
            trigger={() => (
              <Button variant="outline" className="flex items-center gap-2" disabled={!code.trim()}>
                <FileDown className="h-4 w-4" />
                <span>Download PDF</span>
              </Button>
            )}
            content={() => previewRef.current}
            documentTitle={fileName.replace(/\.[^/.]+$/, "")}
            onBeforeGetContent={() => {
              // Force preview to be ready before printing
              setPreviewReady(true)
              return Promise.resolve()
            }}
            onPrintError={handlePrintError}
            pageStyle={`
              @page {
                size: ${printSettings.pageSize} ${printSettings.orientation};
                margin: ${printSettings.margins === "normal" ? "1cm" : "0.5cm"};
              }
              @media print {
                body {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  color-adjust: exact !important;
                }
                .dynamic-content {
                  overflow: visible !important;
                  height: auto !important;
                  min-height: auto !important;
                }
                .preview-container {
                  transform: scale(${printSettings.scale});
                  transform-origin: top left;
                }
              }
            `}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Component Preview</CardTitle>
            <CardDescription>This is how your component will look in the PDF</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              ref={previewRef}
              className="p-4 bg-white rounded-md overflow-auto print-container"
              style={{
                minHeight: "400px",
                breakInside: "avoid",
                pageBreakInside: "avoid",
              }}
            >
              {code.trim() ? (
                <CodePreview
                  code={code}
                  onError={(errorMessage) => {
                    setError(errorMessage)
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Enter or upload code to see preview
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {isPrintSettingsOpen && (
        <PrintSettingsDialog
          open={isPrintSettingsOpen}
          onOpenChange={setIsPrintSettingsOpen}
          settings={printSettings}
          onUpdateSettings={updatePrintSettings}
        />
      )}

      {isFeatureRequestOpen && (
        <FeatureRequestDialog open={isFeatureRequestOpen} onOpenChange={setIsFeatureRequestOpen} />
      )}

      <Toaster />
    </div>
  )
}
