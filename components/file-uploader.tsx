"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileUp, File, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploaderProps {
  onFileUpload: (content: string, fileName: string) => void
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0])
    }
  }

  const processFile = (file: File) => {
    setError(null)

    // Check if it's a valid file type
    if (!file.name.endsWith(".tsx") && !file.name.endsWith(".jsx") && !file.name.endsWith(".js")) {
      setError("Please upload a .tsx, .jsx, or .js file")
      return
    }

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        setFileName(file.name)
        onFileUpload(content, file.name)
      } catch (err) {
        setError("Failed to read file content")
      }
    }

    reader.onerror = () => {
      setError("Failed to read file")
    }

    reader.readAsText(file)
  }

  const clearFile = () => {
    setFileName(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="w-full space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <FileUp className="h-10 w-10 text-gray-400" />
          <div className="space-y-2">
            <p className="text-sm font-medium">Drag and drop your TSX file here, or click to browse</p>
            <p className="text-xs text-muted-foreground">
              Supports .tsx, .jsx, and .js files containing React components
            </p>
          </div>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            Browse Files
          </Button>
          <input ref={fileInputRef} type="file" accept=".tsx,.jsx,.js" className="hidden" onChange={handleFileChange} />
        </div>
      </div>

      {fileName && (
        <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
          <div className="flex items-center space-x-3">
            <File className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">{fileName}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={clearFile} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
