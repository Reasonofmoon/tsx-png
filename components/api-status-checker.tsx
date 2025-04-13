"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function ApiStatusChecker() {
  const [status, setStatus] = useState<"loading" | "available" | "unavailable">("loading")
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        // Simple ping to check if the API is available
        const response = await fetch("/api/ping", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          setStatus("available")
        } else {
          const data = await response.json()
          setStatus("unavailable")
          setErrorMessage(data.error || "API is currently unavailable")
        }
      } catch (error) {
        setStatus("unavailable")
        setErrorMessage("Could not connect to API")
      }
    }

    checkApiStatus()
  }, [])

  if (status === "loading") {
    return null
  }

  if (status === "unavailable") {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>API Unavailable</AlertTitle>
        <AlertDescription>
          {errorMessage || "The AI features are currently unavailable. Some functionality may be limited."}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="mb-4 bg-green-50 border-green-200">
      <CheckCircle2 className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-700">API Connected</AlertTitle>
      <AlertDescription className="text-green-600">AI features are available and ready to use.</AlertDescription>
    </Alert>
  )
}
