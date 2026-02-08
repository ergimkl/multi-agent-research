/**
 * ResearcherAgent - Gathers information from multiple sources
 */

import { BaseAgent } from './BaseAgent'
import { AgentMessage } from '../types'
import { SearchService } from '../services/SearchService'

export class ResearcherAgent extends BaseAgent {
  private searchService: SearchService

  constructor(searchService: SearchService) {
    super('Researcher')
    this.searchService = searchService
  }

  async processMessage(message: AgentMessage): Promise<AgentMessage> {
    this.updateStatus('processing', 10, 'Initiating research')

    const topic = message.content.replace(/^Topic:\s*/i, '').trim()

    this.updateStatus('processing', 30, 'Searching multiple sources')
    
    // Perform comprehensive search
    const [generalResults, academicResults] = await Promise.all([
      this.searchService.search(topic, 10),
      this.searchService.searchAcademic(topic),
    ])

    this.updateStatus('processing', 60, 'Extracting key information')

    // Extract key facts
    const allResults = [...generalResults.results, ...academicResults]
    const keyFacts = this.searchService.extractKeyFacts(allResults)

    // Format research data
    const researchData = this.formatResearchData(topic, generalResults.results, keyFacts)

    this.updateStatus('processing', 90, 'Finalizing research report')

    await this.simulateProcessing(500, 1000)

    this.updateStatus('completed', 100)

    return this.createMessage('Fact Checker', researchData, {
      topic,
      sourceCount: allResults.length,
      keyFactsCount: keyFacts.length,
      usingRealSearch: this.searchService.isConfigured(),
    })
  }

  private formatResearchData(topic: string, results: any[], keyFacts: string[]): string {
    let output = `### Research Topic: ${topic}\n\n`
    output += `**Research Scope:** Comprehensive analysis across multiple domains\n\n`

    if (results.length > 0) {
      output += `**Sources Found:** ${results.length} sources\n\n`
      
      results.slice(0, 5).forEach((result, index) => {
        output += `**${index + 1}. ${result.title}**\n`
        output += `URL: ${result.url}\n`
        output += `${result.description}\n\n`
      })
    }

    if (keyFacts.length > 0) {
      output += `**Key Findings:**\n`
      keyFacts.forEach(fact => {
        output += `- ${fact}\n`
      })
      output += `\n`
    }

    output += `**Summary:**\n`
    output += `Topic shows significant relevance across multiple domains. `
    output += `${results.length} primary sources identified. `
    output += `Research provides comprehensive overview with actionable insights.\n`

    return output
  }
}
