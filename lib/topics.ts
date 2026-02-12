export interface TopicCategory {
  name: string
  icon: string
  topics: string[]
}

export const researchTopics: TopicCategory[] = [
  {
    name: 'AI & Technology',
    icon: '🤖',
    topics: [
      'Future of AI agents in business 2026',
      'Multi-agent systems vs single AI comparison',
      'Current AI regulation and policy landscape',
      'Claude vs GPT vs Gemini detailed comparison',
      'Autonomous AI systems development trends',
      'AI safety and alignment current challenges',
      'Edge AI and local model deployment strategies',
      'AI in software development best practices',
    ]
  },
  {
    name: 'Cryptocurrency & Finance',
    icon: '₿',
    topics: [
      'Bitcoin market analysis and predictions',
      'Top DeFi protocols comprehensive review',
      'Cryptocurrency market cycle current phase',
      'NFT market evolution and opportunities',
      'Ethereum vs Solana technical comparison',
      'Global crypto regulation impact analysis',
      'Layer 2 scaling solutions comparison',
      'Stablecoin ecosystem current state',
    ]
  },
  {
    name: 'Science & Innovation',
    icon: '🔬',
    topics: [
      'Latest climate change mitigation technologies',
      'Quantum computing recent breakthroughs',
      'CRISPR gene editing current applications',
      'Space exploration missions and updates',
      'Renewable energy technology advancements',
      'Nuclear fusion energy latest progress',
      'Biotechnology breakthrough innovations',
      'Brain-computer interfaces development',
    ]
  },
  {
    name: 'Business & Economics',
    icon: '💼',
    topics: [
      'Remote and hybrid work trends analysis',
      'E-commerce evolution and strategies',
      'Current startup funding landscape',
      'AI impact on job market and careers',
      'Gig economy future outlook',
      'Supply chain resilience strategies',
      'Digital transformation implementation',
      'Sustainable business practices trends',
    ]
  },
  {
    name: 'Health & Wellness',
    icon: '🏥',
    topics: [
      'AI in healthcare diagnostics advances',
      'Mental health technology solutions',
      'Personalized medicine latest developments',
      'Telemedicine adoption and trends',
      'Longevity research recent findings',
      'Fitness technology innovations',
      'Nutrition science latest discoveries',
      'Sleep optimization research and tools',
    ]
  }
]