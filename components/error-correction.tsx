"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ArrowRight } from "lucide-react"
import { diffLines } from "diff"

interface ErrorCorrectionProps {
  originalCode: string
  fixedCode: string
  onApplyFix: () => void
}

export default function ErrorCorrection({ originalCode, fixedCode, onApplyFix }: ErrorCorrectionProps) {
  const [activeTab, setActiveTab] = useState<string>("diff")

  const renderDiff = () => {
    const differences = diffLines(originalCode, fixedCode)

    return (
      <div className="font-mono text-sm overflow-auto max-h-[400px] bg-gray-900 p-4 rounded-md">
        {differences.map((part, index) => {
          const color = part.added ? "text-green-400" : part.removed ? "text-red-400" : "text-gray-300"

          const prefix = part.added ? "+ " : part.removed ? "- " : "  "

          return (
            <div key={index} className={`${color} whitespace-pre-wrap`}>
              {part.value.split("\n").map((line, lineIndex) =>
                line.length > 0 ? (
                  <div key={`${index}-${lineIndex}`}>
                    {prefix}
                    {line}
                  </div>
                ) : null,
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const renderCode = (code: string, type: "original" | "fixed") => {
    return (
      <pre
        className={`font-mono text-sm overflow-auto max-h-[400px] bg-gray-900 p-4 rounded-md ${type === "fixed" ? "text-green-400" : "text-gray-300"}`}
      >
        <code>{code}</code>
      </pre>
    )
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-blue-700 flex items-center gap-2">
          <ArrowRight className="h-5 w-5" />
          AI-Suggested Fix
        </CardTitle>
        <CardDescription>The AI has analyzed your code and suggested the following fix:</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diff">Changes</TabsTrigger>
            <TabsTrigger value="original">Original Code</TabsTrigger>
            <TabsTrigger value="fixed">Fixed Code</TabsTrigger>
          </TabsList>

          <TabsContent value="diff" className="mt-4">
            {renderDiff()}
          </TabsContent>

          <TabsContent value="original" className="mt-4">
            {renderCode(originalCode, "original")}
          </TabsContent>

          <TabsContent value="fixed" className="mt-4">
            {renderCode(fixedCode, "fixed")}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => onApplyFix()}>
          <Check className="mr-2 h-4 w-4" />
          Apply Fix
        </Button>
      </CardFooter>
    </Card>
  )
}
