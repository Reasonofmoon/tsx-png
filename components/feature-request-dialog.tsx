"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Lightbulb, Loader2 } from "lucide-react"

interface FeatureRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function FeatureRequestDialog({ open, onOpenChange }: FeatureRequestDialogProps) {
  const [featureRequest, setFeatureRequest] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!featureRequest.trim()) {
      toast({
        title: "Empty Request",
        description: "Please describe the feature you'd like to request.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setAiResponse(null)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch("/api/feature-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request: featureRequest,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit feature request")
      }

      const data = await response.json()
      setAiResponse(data.response)

      toast({
        title: "Feature Request Submitted",
        description: "Your request has been analyzed by our AI.",
      })
    } catch (err) {
      let errorMessage = "Failed to submit feature request"

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          errorMessage = "Request timed out. Please try again."
        } else {
          errorMessage = err.message
        }
      }

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFeatureRequest("")
    setAiResponse(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Request a Feature
          </DialogTitle>
          <DialogDescription>
            Describe a feature or enhancement you'd like to see in this application. Our AI will analyze your request
            and provide feedback.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="feature-request">Feature Description</Label>
            <Textarea
              id="feature-request"
              placeholder="Describe the feature you'd like to request..."
              value={featureRequest}
              onChange={(e) => setFeatureRequest(e.target.value)}
              rows={5}
              className="resize-none"
              disabled={isSubmitting}
            />
          </div>

          {aiResponse && (
            <div className="space-y-2 mt-4">
              <Label>AI Response</Label>
              <div className="p-4 bg-gray-50 rounded-md border text-sm">
                <p className="whitespace-pre-line">{aiResponse}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !featureRequest.trim()}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
