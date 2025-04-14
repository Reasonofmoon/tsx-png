import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TSX to PDF Converter",
  description: "Upload TSX code, preview the rendered component, and download as PDF",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
