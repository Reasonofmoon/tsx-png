"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 오류 로깅
    console.error("TSX to PDF 페이지 오류:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="mb-6 text-red-500">
        <AlertTriangle size={64} />
      </div>
      <h1 className="text-3xl font-bold mb-4">오류가 발생했습니다</h1>
      <p className="text-gray-600 mb-8">TSX to PDF 변환기를 로드하는 중 문제가 발생했습니다. 다시 시도해 주세요.</p>
      <Button onClick={reset} className="px-6 py-3">
        다시 시도
      </Button>
    </div>
  )
}
