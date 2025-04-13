export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">TSX to PDF Converter</h1>
      <p className="text-gray-600 mb-8">Upload TSX code, preview the rendered component, and download as PDF</p>

      <a href="/tsx-to-pdf" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Launch Application
      </a>

      <div className="mt-12 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <ul className="text-left space-y-2">
          <li>• Upload TSX files or write code directly in the editor</li>
          <li>• Preview React components in real-time</li>
          <li>• Export components as PDF with customizable settings</li>
          <li>• AI-powered error correction and suggestions</li>
          <li>• Support for complex React components with charts and icons</li>
        </ul>
      </div>
    </div>
  )
}
