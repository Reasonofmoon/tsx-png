import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function GET() {
  try {
    // Get API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined in environment variables")
      return NextResponse.json({ error: "API key configuration error" }, { status: 500 })
    }

    // Try to initialize the API to check if it's working
    const genAI = new GoogleGenerativeAI(apiKey)

    // Just check if we can get a model reference
    genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // If we get here, the API is available
    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("API ping error:", error)
    return NextResponse.json({ error: "API is currently unavailable" }, { status: 500 })
  }
}
