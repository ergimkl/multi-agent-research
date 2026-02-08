/**
 * SearchService - Handles web search integration
 * Supports Brave Search API for real-time web queries
 */

export interface SearchResult {
  title: string
  url: string
  description: string
  content?: string
  age?: string
}

export interface SearchResponse {
  query: string
  results: SearchResult[]
  totalResults: number
}

export class SearchService {
  private apiKey: string
  private baseUrl = 'https://api.search.brave.com/res/v1'

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.BRAVE_SEARCH_API_KEY || ''
  }

  /**
   * Perform web search using Brave Search API
   */
  async search(query: string, count: number = 10): Promise<SearchResponse> {
    if (!this.apiKey || this.apiKey === 'your_brave_search_api_key_here') {
      console.warn('No Brave Search API key configured, using mock data')
      return this.getMockSearchResults(query, count)
    }

    try {
      const url = `${this.baseUrl}/web/search?q=${encodeURIComponent(query)}&count=${count}`
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip',
          'X-Subscription-Token': this.apiKey,
        },
      })

      if (!response.ok) {
        throw new Error(`Search API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        query,
        results: data.web?.results?.map((result: any) => ({
          title: result.title,
          url: result.url,
          description: result.description,
          content: result.extra_snippets?.join(' ') || result.description,
          age: result.age,
        })) || [],
        totalResults: data.web?.results?.length || 0,
      }
    } catch (error) {
      console.error('Search API error:', error)
      return this.getMockSearchResults(query, count)
    }
  }

  /**
   * Search multiple domains/sources
   */
  async searchMultipleDomains(query: string, domains: string[]): Promise<Map<string, SearchResponse>> {
    const results = new Map<string, SearchResponse>()

    for (const domain of domains) {
      const domainQuery = `${query} site:${domain}`
      const searchResult = await this.search(domainQuery, 5)
      results.set(domain, searchResult)
    }

    return results
  }

  /**
   * Get academic sources for a topic
   */
  async searchAcademic(query: string): Promise<SearchResult[]> {
    const academicDomains = [
      'scholar.google.com',
      'arxiv.org',
      'researchgate.net',
    ]

    const results: SearchResult[] = []
    
    for (const domain of academicDomains.slice(0, 2)) {
      const response = await this.search(`${query} site:${domain}`, 3)
      results.push(...response.results)
    }

    return results
  }

  /**
   * Extract key facts from search results
   */
  extractKeyFacts(results: SearchResult[]): string[] {
    const facts: string[] = []
    
    results.forEach(result => {
      const content = result.content || result.description
      const sentences = content.split(/[.!?]+/)
      
      sentences.forEach(sentence => {
        sentence = sentence.trim()
        if (sentence.length > 20 && sentence.length < 200) {
          if (
            /\d+/.test(sentence) ||
            /\b(is|are|was|were|has|have|shows|indicates|reveals)\b/i.test(sentence)
          ) {
            facts.push(sentence)
          }
        }
      })
    })

    return facts.slice(0, 10)
  }

  /**
   * Mock search results for when API is not configured
   */
  private getMockSearchResults(query: string, count: number): SearchResponse {
    const mockResults: SearchResult[] = [
      {
        title: `${query}: Comprehensive Overview`,
        url: 'https://example.com/article1',
        description: `A comprehensive overview of ${query.toLowerCase()}, covering key concepts, recent developments, and future implications.`,
        content: `${query} represents a significant area of research and development. Recent studies have shown substantial progress.`,
      },
      {
        title: `Latest Research on ${query}`,
        url: 'https://example.com/research',
        description: `Recent academic research and industry reports on ${query.toLowerCase()}.`,
        content: `Academic institutions have published extensive research on ${query.toLowerCase()}. Data indicates growing interest.`,
      },
      {
        title: `${query}: Expert Analysis`,
        url: 'https://example.com/expert',
        description: `Expert perspectives on ${query.toLowerCase()} from industry leaders.`,
        content: `Industry experts highlight ${query.toLowerCase()} as a critical area for innovation.`,
      },
    ]

    return {
      query,
      results: mockResults.slice(0, count),
      totalResults: mockResults.length,
    }
  }

  isConfigured(): boolean {
    return !!(this.apiKey && this.apiKey !== 'your_brave_search_api_key_here')
  }
}

let searchServiceInstance: SearchService | null = null

export function getSearchService(apiKey?: string): SearchService {
  if (!searchServiceInstance) {
    searchServiceInstance = new SearchService(apiKey)
  }
  return searchServiceInstance
}
