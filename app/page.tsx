'use client'

import { useState } from 'react'
import { AgentMessage } from '@/lib/types'

interface AgentStatus {
  name: string
  icon: string
  description: string
  status: 'idle' | 'processing' | 'completed'
  messagesProcessed: number
  color: string
}

export default function Home() {
  const [topic, setTopic] = useState('')
  const [isResearching, setIsResearching] = useState(false)
  const [messages, setMessages] = useState<AgentMessage[]>([])
  const [finalReport, setFinalReport] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [braveApiKey, setBraveApiKey] = useState('')
  const [anthropicApiKey, setAnthropicApiKey] = useState('')
  
  const [agentStates, setAgentStates] = useState<AgentStatus[]>([
    { name: 'Researcher', icon: '🔍', description: 'Gathers and explores information', status: 'idle', messagesProcessed: 0, color: 'from-blue-500 to-blue-700' },
    { name: 'Fact-Checker', icon: '✓', description: 'Verifies accuracy and credibility', status: 'idle', messagesProcessed: 0, color: 'from-green-500 to-green-700' },
    { name: 'Synthesizer', icon: '🧠', description: 'Combines insights and patterns', status: 'idle', messagesProcessed: 0, color: 'from-purple-500 to-purple-700' },
    { name: 'Critic', icon: '⚡', description: 'Evaluates quality and completeness', status: 'idle', messagesProcessed: 0, color: 'from-yellow-500 to-yellow-700' },
  ])

  const startResearch = async () => {
    if (!topic.trim()) return

    setIsResearching(true)
    setMessages([])
    setFinalReport('')
    
    // Reset all agents to idle
    setAgentStates(prev => prev.map(agent => ({
      ...agent,
      status: 'idle' as const,
      messagesProcessed: 0
    })))

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          braveApiKey: braveApiKey || undefined,
          anthropicApiKey: anthropicApiKey || undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Update messages
        setMessages(data.messages)
        setFinalReport(data.finalReport)

        // Update agent states based on messages
        const agentMessageCounts: Record<string, number> = {}
        data.messages.forEach((msg: AgentMessage) => {
          agentMessageCounts[msg.from] = (agentMessageCounts[msg.from] || 0) + 1
        })

        setAgentStates(prev => prev.map(agent => ({
          ...agent,
          status: 'completed' as const,
          messagesProcessed: agentMessageCounts[agent.name] || 0
        })))
      } else {
        alert('Research failed: ' + data.error)
      }
    } catch (error) {
      console.error('Research error:', error)
      alert('Failed to conduct research')
    } finally {
      setIsResearching(false)
    }
  }

  const downloadReport = () => {
    const blob = new Blob([finalReport], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `research-${topic.replace(/\s+/g, '-')}.md`
    a.click()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 glow-text">
            Multi-Agent Research System
          </h1>
          <p className="text-xl text-gray-300">
            AI agents collaborating to research any topic
          </p>
        </div>

        {/* Settings Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            ⚙️ Settings
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="glass-morphism p-6 rounded-xl mb-8">
            <h3 className="text-xl font-bold mb-4">API Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Brave Search API Key</label>
                <input
                  type="password"
                  value={braveApiKey}
                  onChange={(e) => setBraveApiKey(e.target.value)}
                  placeholder="Optional: Enter your Brave Search API key"
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Anthropic API Key</label>
                <input
                  type="password"
                  value={anthropicApiKey}
                  onChange={(e) => setAnthropicApiKey(e.target.value)}
                  placeholder="Optional: Enter your Anthropic API key"
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <p className="text-sm text-gray-400">
                💡 Without API keys, the system uses mock data for demonstration. Add real API keys for actual web search and AI analysis.
              </p>
            </div>
          </div>
        )}

        {/* Research Input */}
        <div className="glass-morphism p-8 rounded-xl mb-8">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isResearching && startResearch()}
            placeholder="Enter research topic (e.g., 'Future of AI Agents')"
            className="w-full px-6 py-4 bg-gray-800/50 rounded-lg text-lg border-2 border-blue-500/50 focus:border-blue-500 focus:outline-none mb-4"
            disabled={isResearching}
          />
          <button
            onClick={startResearch}
            disabled={isResearching || !topic.trim()}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-bold text-lg transition-all"
          >
            {isResearching ? '🔄 Researching...' : '🚀 Start Research'}
          </button>
        </div>

        {/* Agent Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {agentStates.map((agent) => (
            <div
              key={agent.name}
              className={`glass-morphism p-6 rounded-xl ${
                agent.status === 'processing' ? 'animate-glow' : ''
              }`}
            >
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{agent.icon}</span>
                <div>
                  <h3 className="font-bold text-lg">{agent.name} Agent</h3>
                  <p className="text-sm text-gray-400">{agent.description}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    {agent.status === 'idle' && 'Idle'}
                    {agent.status === 'processing' && '🔄 Processing...'}
                    {agent.status === 'completed' && '✓ Complete'}
                  </span>
                  <span className="text-sm text-gray-400">
                    Messages: {agent.messagesProcessed}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${agent.color} transition-all duration-500`}
                    style={{
                      width: agent.status === 'completed' ? '100%' : agent.status === 'processing' ? '50%' : '0%'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Flow */}
        {messages.length > 0 && (
          <div className="glass-morphism p-6 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Agent Communication Flow
              <span className="ml-2 text-lg text-gray-400">({messages.length} messages)</span>
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={msg.id || index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-blue-400">{msg.from}</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-bold text-green-400">{msg.to}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-3">
                    {msg.content.substring(0, 200)}...
                  </p>
                  {msg.metadata && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.metadata.credibilityScore && (
                        <span className="text-xs px-2 py-1 bg-green-900/50 rounded">
                          ✓ {msg.metadata.credibilityScore}% Credibility
                        </span>
                      )}
                      {msg.metadata.approved !== undefined && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          msg.metadata.approved ? 'bg-green-900/50' : 'bg-yellow-900/50'
                        }`}>
                          {msg.metadata.approved ? '✓ Approved' : '⚠ Needs Review'}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final Report */}
        {finalReport && (
          <div className="glass-morphism p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">📊 Final Research Report</h2>
              <button
                onClick={downloadReport}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                📥 Download
              </button>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
                {finalReport}
              </pre>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Built with AI-powered multi-agent architecture • Real-time collaboration • Enterprise-grade quality</p>
        </div>
      </div>
    </main>
  )
}
