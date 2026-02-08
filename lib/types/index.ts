/**
 * Type definitions for the Multi-Agent Research System
 */

export interface AgentMessage {
  id: string
  from: string
  to: string
  content: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface AgentState {
  status: 'idle' | 'processing' | 'completed' | 'error'
  progress: number
  currentTask?: string
  messagesProcessed: number
}

export interface ResearchResult {
  topic: string
  researchData: string
  sources: Array<{
    title: string
    url: string
    relevance: number
  }>
  keyFindings: string[]
  timestamp: Date
}

export interface VerificationResult {
  verified: boolean
  credibilityScore: number
  issues: string[]
  strengths: string[]
  originalData: string
}

export interface SynthesisResult {
  summary: string
  keyInsights: string[]
  patterns: string[]
  recommendations: string[]
  coherenceScore: number
}

export interface CritiqueResult {
  overallQuality: number
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  approved: boolean
  finalRating: string
}

export interface ResearchReport {
  topic: string
  qualityScore: number
  status: 'approved' | 'needs_revision'
  researchPhase: ResearchResult
  verificationPhase: VerificationResult
  synthesisPhase: SynthesisResult
  critiquePhase: CritiqueResult
  generatedAt: Date
}
