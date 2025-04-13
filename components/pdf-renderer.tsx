"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PDFRendererProps {
  contentRef: React.RefObject<HTMLDivElement>
  fileName: string
  printSettings: {
    pageSize: string
    orientation: string
    margins: string
    scale: number
  }
}

export default function PDFRenderer({ contentRef, fileName, printSettings }: PDFRendererProps) {
  const [isPrinting, setIsPrinting] = useState(false)
  const { toast } = useToast()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handlePrint = async () => {
    if (!contentRef.current) {
      toast({
        title: "Error",
        description: "No content to print",
        variant: "destructive",
      })
      return
    }

    setIsPrinting(true)

    try {
      // Create a new window for printing
      const printWindow = window.open("", "_blank")

      if (!printWindow) {
        throw new Error("Could not open print window. Please check your popup blocker settings.")
      }

      // Get the content to print
      const contentElement = contentRef.current
      const contentHTML = contentElement.innerHTML

      // Create the print document with proper styling
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${fileName}</title>
          <style>
            @page {
              size: ${printSettings.pageSize} ${printSettings.orientation};
              margin: ${printSettings.margins === "normal" ? "1cm" : "0.5cm"};
            }
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              color: #000;
              background: #fff;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            .print-container {
              padding: 20px;
              transform: scale(${printSettings.scale});
              transform-origin: top left;
              max-width: 100%;
              box-sizing: border-box;
            }
            /* Ensure proper spacing in tables */
            table {
              width: 100%;
              border-collapse: collapse;
              page-break-inside: avoid;
            }
            table td, table th {
              padding: 8px;
              vertical-align: top;
            }
            /* Prevent text overflow */
            p, h1, h2, h3, h4, h5, h6, div, span {
              overflow-wrap: break-word;
              word-wrap: break-word;
              hyphens: auto;
              max-width: 100%;
            }
            /* Ensure charts and images don't overflow */
            img, svg, .mock-recharts-component {
              max-width: 100%;
              height: auto;
            }
            /* Preserve colors and backgrounds */
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${contentHTML}
          </div>
          <script>
            // Print and close the window after content is loaded
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 500);
            };
          </script>
        </body>
        </html>
      `)

      printWindow.document.close()

      // Listen for the window close event to update the printing state
      const checkWindowClosed = setInterval(() => {
        if (printWindow.closed) {
          clearInterval(checkWindowClosed)
          setIsPrinting(false)
        }
      }, 500)
    } catch (error) {
      console.error("Print error:", error)
      setIsPrinting(false)
      toast({
        title: "PDF Generation Error",
        description: error instanceof Error ? error.message : "Failed to generate PDF",
        variant: "destructive",
      })
    }
  }

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={isPrinting || !contentRef.current}
      onClick={handlePrint}
    >
      {isPrinting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <FileDown className="h-4 w-4" />
          <span>Download PDF</span>
        </>
      )}
    </Button>
  )
}
