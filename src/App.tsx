import React, { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { LoginForm } from './components/LoginForm'
import { Header } from './components/Header'
import { UrlInput } from './components/UrlInput'
import { ResultsPanel } from './components/ResultsPanel'
import { analyzePage } from './services/psiApi'
import { AnalysisResult } from './types/psi'
import { Loader2, AlertCircle } from 'lucide-react'

function App() {
  const { user, loading } = useAuth()
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (url: string, strategy: 'mobile' | 'desktop') => {
    setAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const analysisResult = await analyzePage(url, strategy)
      setResult(analysisResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setAnalyzing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <UrlInput onAnalyze={handleAnalyze} loading={analyzing} />
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800 font-medium">Analysis Failed</p>
            </div>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        )}
        
        {result && <ResultsPanel result={result} />}
      </main>
    </div>
  )
}

export default App