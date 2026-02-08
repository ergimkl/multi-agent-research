import { NextRequest, NextResponse } from 'next/server'
import { AgentOrchestrator } from '@/lib/agents/AgentOrchestrator'
import { ResearcherAgent } from '@/lib/agents/ResearcherAgent'
import { FactCheckerAgent } from '@/lib/agents/FactCheckerAgent'
import { SynthesizerAgent } from '@/lib/agents/SynthesizerAgent'
import { CriticAgent } from '@/lib/agents/CriticAgent'
import { SearchService } from '@/lib/services/SearchService'
import { AIService } from '@/lib/services/AIService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, braveApiKey, anthropicApiKey } = body

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      )
    }

    // Initialize services with provided API keys or environment variables
    const searchService = new SearchService(braveApiKey)
    const aiService = new AIService(anthropicApiKey)

    // Create agents
    const researcher = new ResearcherAgent(searchService)
    const factChecker = new FactCheckerAgent(aiService)
    const synthesizer = new SynthesizerAgent(aiService)
    const critic = new CriticAgent(aiService)

    // Create orchestrator
    const orchestrator = new AgentOrchestrator(
      researcher,
      factChecker,
      synthesizer,
      critic
    )

    // Conduct research
    const result = await orchestrator.conductResearch(topic)

    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (error: any) {
    console.error('Research API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
