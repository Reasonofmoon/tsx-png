import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const { code, error } = await request.json()

    if (!code || !error) {
      return NextResponse.json({ error: "Code and error are required" }, { status: 400 })
    }

    // Get API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined in environment variables")
      return NextResponse.json({ error: "API key configuration error. Please check server logs." }, { status: 500 })
    }

    // Create a prompt for the Gemini model
    const prompt = `
      I have a React TSX component with the following error:
      
      ERROR: ${error}
      
      Here is the code:
      \`\`\`tsx
      ${code}
      \`\`\`
      
      Please analyze the error and provide a fixed version of the code. 
      Only return the complete fixed code without any explanations or markdown formatting.
    `

    try {
      // Initialize the Gemini API with proper error handling
      const genAI = new GoogleGenerativeAI(apiKey)

      // Get the generative model with the correct model name
      // Using gemini-1.5-flash for faster response and better error handling
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      // Generate content with timeout and error handling
      const result = (await Promise.race([
        model.generateContent(prompt),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Request timeout")), 30000)),
      ])) as any

      const response = await result.response
      const text = response.text()

      // Extract code from the response (in case it still has markdown)
      let fixedCode = text
      const codeBlockMatch = text.match(/```(?:tsx|jsx|javascript|js)?\s*([\s\S]*?)```/)
      if (codeBlockMatch && codeBlockMatch[1]) {
        fixedCode = codeBlockMatch[1].trim()
      }

      return NextResponse.json({ fixedCode })
    } catch (apiError) {
      console.error("Gemini API error:", apiError)

      // Provide a more helpful error message based on the error type
      let errorMessage = "Failed to analyze error with Gemini API"

      if (apiError instanceof Error) {
        if (apiError.message.includes("timeout")) {
          errorMessage = "Request to Gemini API timed out. Please try again."
        } else if (apiError.message.includes("quota")) {
          errorMessage = "API quota exceeded. Please try again later."
        } else if (apiError.message.includes("permission") || apiError.message.includes("access")) {
          errorMessage = "API access denied. Please check your API key configuration."
        }
      }

      return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
  } catch (error) {
    console.error("Error analyzing code:", error)
    return NextResponse.json({ error: "Failed to analyze error" }, { status: 500 })
  }
}
