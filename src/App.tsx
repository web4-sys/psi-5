import React from 'react'
import { useAuth } from './hooks/useAuth'
import { LoginForm } from './components/LoginForm'
import { Header } from './components/Header'
import { Loader2 } from 'lucide-react'

function App() {
  const { user, loading } = useAuth()

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
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to PSI Insight</h2>
          <p className="text-gray-600 mb-6">
            Analyze your website's performance and SEO metrics using Google Lighthouse technology.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Getting Started</h3>
            <p className="text-blue-800 text-sm">
              Your authentication is now set up! You can now add your page speed insights functionality here.
              The existing project structure has been preserved and enhanced with user authentication.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App