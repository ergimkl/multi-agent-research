/**
 * BaseAgent - Abstract base class for all agents in the system
 */

import { AgentMessage, AgentState } from '../types'

export abstract class BaseAgent {
  protected name: string
  protected state: AgentState
  protected messageQueue: AgentMessage[] = []

  constructor(name: string) {
    this.name = name
    this.state = {
      status: 'idle',
      progress: 0,
      messagesProcessed: 0,
    }
  }

  /**
   * Process an incoming message
   */
  abstract processMessage(message: AgentMessage): Promise<AgentMessage>

  /**
   * Get current agent state
   */
  getState(): AgentState {
    return { ...this.state }
  }

  /**
   * Get agent name
   */
  getName(): string {
    return this.name
  }

  /**
   * Update agent status
   */
  protected updateStatus(status: AgentState['status'], progress?: number, task?: string) {
    this.state.status = status
    if (progress !== undefined) {
      this.state.progress = progress
    }
    if (task) {
      this.state.currentTask = task
    }
  }

  /**
   * Create a response message
   */
  protected createMessage(to: string, content: string, metadata?: Record<string, any>): AgentMessage {
    this.state.messagesProcessed++
    
    return {
      id: `${this.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      from: this.name,
      to,
      content,
      timestamp: new Date(),
      metadata,
    }
  }

  /**
   * Simulate processing time
   */
  protected async simulateProcessing(minMs: number = 1000, maxMs: number = 3000): Promise<void> {
    const delay = minMs + Math.random() * (maxMs - minMs)
    await new Promise(resolve => setTimeout(resolve, delay))
  }
}
