import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const { request: featureRequest } = await request.json()

    if (!featureRequest) {
      return NextResponse.json({ error: "Feature request is required" }, { status: 400 })
    }

    // Get API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined in environment variables")
      return NextResponse.json({ error: "API key configuration error. Please check server logs." }, { status: 500 })
    }

    // Create a prompt for the Gemini model
    const prompt = `
      I have a Next.js application that converts TSX code to PDF. A user has requested the following feature or enhancement:
      
      "${featureRequest}"
      
      Please analyze this feature request and provide a response that includes:
      1. Whether this feature is feasible to implement
      2. What would be involved in implementing it
      3. Any alternatives or suggestions that might better address the user's needs
      
      Keep your response concise and user-friendly, focusing on practical next steps.
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

      return NextResponse.json({ response: text })
    } catch (apiError) {
      console.error("Gemini API error:", apiError)

      // Provide a more helpful error message based on the error type
      let errorMessage = "Failed to process feature request with Gemini API"

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
    console.error("Error processing feature request:", error)
    return NextResponse.json({ error: "Failed to process feature request" }, { status: 500 })
  }
}
