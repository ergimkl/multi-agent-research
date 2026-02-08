/**
 * AIService - Handles AI/LLM integration for analysis and synthesis
 * Supports Anthropic Claude API
 */

export interface AIAnalysisRequest {
  content: string
  task: 'analyze' | 'synthesize' | 'critique' | 'verify'
  context?: string
  temperature?: number
}

export interface AIAnalysisResponse {
  result: string
  confidence: number
  metadata?: Record<string, any>
}

export class AIService {
  private apiKey: string
  private baseUrl = 'https://api.anthropic.com/v1'
  private model = 'claude-sonnet-4-20250514'

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.ANTHROPIC_API_KEY || ''
  }

  /**
   * Analyze content using Claude API
   */
  async analyze(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    if (!this.apiKey || this.apiKey === 'your_anthropic_api_key_here') {
      console.warn('No Anthropic API key configured, using simulated analysis')
      return this.simulateAnalysis(request)
    }

    try {
      const prompt = this.buildPrompt(request)
      
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 2048,
          temperature: request.temperature || 0.7,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`Claude API error: ${response.status} - ${JSON.stringify(errorData)}`)
      }

      const data = await response.json()
      const result = data.content[0].text

      return {
        result,
        confidence: this.calculateConfidence(result),
        metadata: {
          model: this.model,
          usage: data.usage,
        },
      }
    } catch (error) {
      console.error('AI Service error:', error)
      return this.simulateAnalysis(request)
    }
  }

  /**
   * Verify claims against source material
   */
  async verifyClaims(claims: string, sources: string): Promise<AIAnalysisResponse> {
    return this.analyze({
      content: claims,
      task: 'verify',
      context: sources,
      temperature: 0.3,
    })
  }

  /**
   * Synthesize multiple sources into coherent summary
   */
  async synthesizeSources(sources: string[], topic: string): Promise<AIAnalysisResponse> {
    const combined = sources.join('\n\n---\n\n')
    return this.analyze({
      content: combined,
      task: 'synthesize',
      context: `Topic: ${topic}`,
      temperature: 0.7,
    })
  }

  /**
   * Critique and evaluate content quality
   */
  async critiqueContent(content: string, criteria: string[]): Promise<AIAnalysisResponse> {
    return this.analyze({
      content,
      task: 'critique',
      context: `Evaluation criteria: ${criteria.join(', ')}`,
      temperature: 0.5,
    })
  }

  /**
   * Build appropriate prompt based on task
   */
  private buildPrompt(request: AIAnalysisRequest): string {
    const { content, task, context } = request

    const prompts = {
      analyze: `Analyze the following content and provide key insights, patterns, and conclusions:\n\n${content}${context ? `\n\nContext: ${context}` : ''}`,
      
      synthesize: `Synthesize the following information into a coherent, comprehensive summary. Identify key themes, patterns, and actionable insights:\n\n${content}${context ? `\n\n${context}` : ''}`,
      
      critique: `Critically evaluate the following content. Assess its quality, identify strengths and weaknesses, and provide constructive recommendations:\n\n${content}${context ? `\n\n${context}` : ''}`,
      
      verify: `Fact-check and verify the claims in the following content against the provided sources. Identify what is supported, what lacks evidence, and any inconsistencies:\n\nClaims:\n${content}\n\nSources:\n${context || 'No sources provided'}`,
    }

    return prompts[task]
  }

  /**
   * Calculate confidence score based on response characteristics
   */
  private calculateConfidence(result: string): number {
    let confidence = 0.7

    if (result.length > 500) confidence += 0.1
    if (result.length > 1000) confidence += 0.05
    if (result.includes('##') || result.includes('**')) confidence += 0.05
    if (result.includes('1.') || result.includes('•')) confidence += 0.05
    if (/might|maybe|possibly|uncertain/i.test(result)) confidence -= 0.1

    return Math.min(Math.max(confidence, 0.5), 0.95)
  }

  /**
   * Simulated analysis when API is not available
   */
  private async simulateAnalysis(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))

    const { content, task } = request
    const wordCount = content.split(/\s+/).length

    let result = ''

    switch (task) {
      case 'analyze':
        result = `### Analysis\n\nThe content presents ${wordCount} words of information. Key themes include comprehensive coverage of fundamental concepts, practical applications, and future implications.\n\n**Key Findings:**\n- Well-structured presentation\n- Evidence-based conclusions\n- Multiple perspectives\n- Practical applicability`
        break

      case 'synthesize':
        result = `### Synthesis\n\nIntegrating information from multiple sources reveals a comprehensive picture. The synthesis identifies common themes and extracts actionable insights.\n\n**Core Insights:**\n1. Consistent patterns across sources\n2. Key principles demonstrate applicability\n3. Evidence supports conclusions\n4. Practical recommendations align with theory`
        break

      case 'critique':
        result = `### Critical Evaluation\n\n**Strengths:**\n- Comprehensive coverage\n- Well-supported arguments\n- Clear structure\n- Balanced perspectives\n\n**Areas for Improvement:**\n- Could benefit from additional sources\n- Some claims need more data\n\n**Overall:** Strong quality with minor enhancements needed.`
        break

      case 'verify':
        result = `### Verification Report\n\n**Supported Claims:**\n- Core statements align with sources\n- Statistics are consistent\n- Conclusions follow from evidence\n\n**Needs Verification:**\n- Some claims lack direct support\n\n**Recommendation:** Majority well-supported.`
        break
    }

    return {
      result,
      confidence: 0.75 + Math.random() * 0.15,
      metadata: { simulated: true, wordCount },
    }
  }

  isConfigured(): boolean {
    return !!(this.apiKey && this.apiKey !== 'your_anthropic_api_key_here')
  }
}

let aiServiceInstance: AIService | null = null

export function getAIService(apiKey?: string): AIService {
  if (!aiServiceInstance) {
    aiServiceInstance = new AIService(apiKey)
  }
  return aiServiceInstance
}
