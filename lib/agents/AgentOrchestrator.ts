/**
 * AgentOrchestrator - Coordinates multi-agent research workflow
 */

import { BaseAgent } from './BaseAgent'
import { AgentMessage, ResearchReport } from '../types'
import { ResearcherAgent } from './ResearcherAgent'
import { FactCheckerAgent } from './FactCheckerAgent'
import { SynthesizerAgent } from './SynthesizerAgent'
import { CriticAgent } from './CriticAgent'

export interface OrchestrationResult {
  messages: AgentMessage[]
  finalReport: string
  metadata: {
    totalMessages: number
    researchQuality: number
    approved: boolean
    timestamp: Date
  }
}

export class AgentOrchestrator {
  private agents: Map<string, BaseAgent> = new Map()
  private messages: AgentMessage[] = []

  constructor(
    researcher: ResearcherAgent,
    factChecker: FactCheckerAgent,
    synthesizer: SynthesizerAgent,
    critic: CriticAgent
  ) {
    this.agents.set('Researcher', researcher)
    this.agents.set('Fact Checker', factChecker)
    this.agents.set('Synthesizer', synthesizer)
    this.agents.set('Critic', critic)
  }

  /**
   * Start the research workflow for a given topic
   */
  async conductResearch(
    topic: string,
    onMessage?: (message: AgentMessage) => void
  ): Promise<OrchestrationResult> {
    this.messages = []

    // Step 1: Researcher gathers information
    const initialMessage: AgentMessage = {
      id: 'orchestrator-init',
      from: 'Orchestrator',
      to: 'Researcher',
      content: `Topic: ${topic}`,
      timestamp: new Date(),
    }

    this.addMessage(initialMessage, onMessage)

    const researcher = this.agents.get('Researcher')!
    const researchMessage = await researcher.processMessage(initialMessage)
    this.addMessage(researchMessage, onMessage)

    // Step 2: Fact Checker verifies
    const factChecker = this.agents.get('Fact Checker')!
    const verificationMessage = await factChecker.processMessage(researchMessage)
    this.addMessage(verificationMessage, onMessage)

    // Step 3: Synthesizer combines insights
    const synthesizer = this.agents.get('Synthesizer')!
    const synthesisMessage = await synthesizer.processMessage(verificationMessage)
    this.addMessage(synthesisMessage, onMessage)

    // Step 4: Critic evaluates
    const critic = this.agents.get('Critic')!
    const critiqueMessage = await critic.processMessage(synthesisMessage)
    this.addMessage(critiqueMessage, onMessage)

    // Extract quality metrics
    const qualityScore = critiqueMessage.metadata?.overallQuality || 85
    const approved = critiqueMessage.metadata?.approved || qualityScore > 80

    return {
      messages: [...this.messages],
      finalReport: critiqueMessage.content,
      metadata: {
        totalMessages: this.messages.length,
        researchQuality: qualityScore,
        approved,
        timestamp: new Date(),
      },
    }
  }

  /**
   * Get current state of all agents
   */
  getAgentStates() {
    const states: Record<string, any> = {}
    this.agents.forEach((agent, name) => {
      states[name] = agent.getState()
    })
    return states
  }

  /**
   * Get all messages
   */
  getMessages(): AgentMessage[] {
    return [...this.messages]
  }

  /**
   * Add message to history and notify callback
   */
  private addMessage(message: AgentMessage, onMessage?: (message: AgentMessage) => void) {
    this.messages.push(message)
    if (onMessage) {
      onMessage(message)
    }
  }
}
