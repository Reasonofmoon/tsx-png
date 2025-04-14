"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileImage, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import html2canvas from "html2canvas"

interface PngRendererProps {
  contentRef: React.RefObject<HTMLDivElement | null>
  fileName: string
}

export default function PngRenderer({ contentRef, fileName }: PngRendererProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    if (!contentRef.current) {
      toast({
        title: "오류",
        description: "내보낼 콘텐츠가 없습니다",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)

    try {
      // 콘텐츠 요소의 스타일을 백업
      const originalStyle = contentRef.current.style.cssText

      // 캡처를 위해 스타일 조정
      contentRef.current.style.overflow = "visible"
      contentRef.current.style.height = "auto"
      contentRef.current.style.width = "100%"

      // html2canvas를 사용하여 요소를 캡처
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // 고해상도를 위해 스케일 조정
        useCORS: true, // 외부 이미지 허용
        logging: false,
        backgroundColor: "#ffffff",
      })

      // 원래 스타일 복원
      contentRef.current.style.cssText = originalStyle

      // 캔버스를 PNG로 변환
      const imageUrl = canvas.toDataURL("image/png")

      // 다운로드 링크 생성
      const link = document.createElement("a")
      link.download = `${fileName || "component"}.png`
      link.href = imageUrl
      link.click()

      toast({
        title: "내보내기 성공",
        description: "PNG 이미지가 성공적으로 저장되었습니다.",
      })
    } catch (error) {
      console.error("PNG 내보내기 오류:", error)
      toast({
        title: "내보내기 실패",
        description: error instanceof Error ? error.message : "PNG 생성 중 오류가 발생했습니다",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={isExporting || !contentRef.current}
      onClick={handleExport}
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>PNG 생성 중...</span>
        </>
      ) : (
        <>
          <FileImage className="h-4 w-4" />
          <span>PNG로 저장</span>
        </>
      )}
    </Button>
  )
}
