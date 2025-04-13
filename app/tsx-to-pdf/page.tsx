"use client"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileUp, Code, Eye, AlertTriangle, Wand2, Lightbulb, Settings } from "lucide-react"
import dynamic from "next/dynamic"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// 서버 사이드 렌더링 방지
export const runtime = "edge"

// 모든 클라이언트 컴포넌트를 동적으로 가져오기
const FileUploader = dynamic(() => import("@/components/file-uploader"), { ssr: false })
const PDFRenderer = dynamic(() => import("@/components/pdf-renderer"), { ssr: false })
const PngRenderer = dynamic(() => import("@/components/png-renderer"), { ssr: false })
const ApiStatusChecker = dynamic(() => import("@/components/api-status-checker"), { ssr: false })
const CodeEditor = dynamic(() => import("@/components/code-editor"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-md"></div>,
})
const CodePreview = dynamic(() => import("@/components/code-preview"), {
  ssr: false,
  loading: () => <div className="text-center py-4">Loading component preview...</div>,
})
const ErrorCorrection = dynamic(() => import("@/components/error-correction"), { ssr: false })
const FeatureRequestDialog = dynamic(() => import("@/components/feature-request-dialog"), { ssr: false })
const PrintSettingsDialog = dynamic(() => import("@/components/print-settings-dialog"), { ssr: false })

export default function TsxToPdfPage() {
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
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null)
  const [printSettings, setPrintSettings] = useState({
    pageSize: "a4",
    orientation: "portrait",
    margins: "normal",
    scale: 1,
  })
  const { toast } = useToast()

  // 컴포넌트 마운트 시 API 가용성 확인
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch("/api/ping")
        setApiAvailable(response.ok)
      } catch (error) {
        setApiAvailable(false)
      }
    }

    checkApiStatus()
  }, [])

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

  // JSX에 더 관대한 개선된 유효성 검사 함수
  const validateCode = (code: string): { isValid: boolean; error?: string } => {
    try {
      // 빈 코드에 대한 유효성 검사 건너뛰기
      if (!code.trim()) {
        return { isValid: false, error: "Please enter or upload some TSX code first" }
      }

      // JSX에서 오탐지를 일으킬 수 있는 엄격한 괄호 유효성 검사 건너뛰기
      // 대신 미리보기 컴포넌트가 렌더링 오류를 처리하도록 함

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

    // 항상 미리보기 준비를 true로 설정 - CodePreview 컴포넌트가 오류를 처리하도록 함
    setPreviewReady(true)
    setError(null)
  }

  const handleErrorAnalysis = async () => {
    if (!error) return

    // API 가용성 확인
    if (apiAvailable === false) {
      toast({
        title: "API Unavailable",
        description: "The AI error analysis feature is currently unavailable. Please try again later.",
        variant: "destructive",
        duration: 5000,
      })
      return
    }

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

  const updatePrintSettings = (settings) => {
    setPrintSettings(settings)
  }

  // 안전한 렌더링을 위한 오류 경계
  const renderPreview = () => {
    try {
      if (!code.trim()) {
        return (
          <div className="flex items-center justify-center h-full text-gray-400">
            Enter or upload code to see preview
          </div>
        )
      }

      return (
        <CodePreview
          code={code}
          onError={(errorMessage) => {
            if (errorMessage) {
              setError(errorMessage)
            }
          }}
        />
      )
    } catch (renderError) {
      console.error("Preview rendering error:", renderError)
      return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold">Error rendering preview:</p>
            <p className="text-sm">{renderError instanceof Error ? renderError.message : "Unknown error"}</p>
          </AlertDescription>
        </Alert>
      )
    }
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

        {/* API 상태 표시기 */}
        {apiAvailable !== null && <ApiStatusChecker />}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsPrintSettingsOpen(true)} className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>PDF Settings</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsFeatureRequestOpen(true)}
            className="flex items-center gap-2"
            disabled={apiAvailable === false}
          >
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleErrorAnalysis}
                  className="flex items-center gap-2"
                  disabled={apiAvailable === false}
                >
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

          <PDFRenderer
            contentRef={previewRef}
            fileName={fileName.replace(/\.[^/.]+$/, "")}
            printSettings={printSettings}
          />

          {/* PNG 렌더러 추가 */}
          <PngRenderer contentRef={previewRef} fileName={fileName.replace(/\.[^/.]+$/, "")} />
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
              {renderPreview()}
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
