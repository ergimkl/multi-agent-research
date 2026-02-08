# 🤖 Multi-Agent Research System

An AI-powered research platform where specialized agents collaborate to conduct comprehensive research on any topic. Built with Next.js, TypeScript, and real AI/search APIs.

## 🌟 Features

### **Multi-Agent Architecture**
- **🔍 Researcher Agent**: Searches and gathers information from multiple sources
- **✓ Fact-Checker Agent**: Verifies credibility and cross-references claims
- **🧠 Synthesizer Agent**: Combines insights into coherent analysis
- **⚡ Critic Agent**: Evaluates quality and provides final assessment

### **Real Intelligence**
- **Brave Search API** integration for actual web search
- **Anthropic Claude API** integration for AI-powered analysis
- **Graceful fallbacks** to mock data when APIs aren't configured

### **Futuristic UI**
- Glass-morphism design with animated cyber-grid background
- Real-time agent status monitoring
- Live message flow visualization
- Downloadable research reports

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or extract the project**
```bash
cd multi-agent-research
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API keys (Optional but recommended)**

Create a `.env.local` file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:
```env
BRAVE_SEARCH_API_KEY=your_brave_search_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

**Get API Keys:**
- **Brave Search**: https://brave.com/search/api/ (Free tier: 2,000 queries/month)
- **Anthropic Claude**: https://console.anthropic.com/settings/keys

**Note**: The system works without API keys using mock data for demonstration!

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 📖 How It Works

### Research Workflow

1. **User enters a research topic** (e.g., "Future of AI Agents")
2. **Orchestrator** initializes the workflow
3. **Researcher Agent** searches the web and gathers sources
4. **Fact-Checker Agent** verifies credibility and consistency
5. **Synthesizer Agent** combines insights into comprehensive report
6. **Critic Agent** evaluates quality and approves final output
7. **User receives** a professional research report with quality scores

### Agent Communication

Agents communicate through a message-passing system:
- Each agent processes incoming messages
- Agents transform and enrich the data
- Messages flow sequentially through the pipeline
- All communication is logged and visualized

### Architecture

```
┌─────────────────┐
│  User Interface │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Orchestrator   │
└────────┬────────┘
         │
         ├──► Researcher ──► Fact-Checker ──► Synthesizer ──► Critic
         │        │               │                │              │
         │        ▼               ▼                ▼              ▼
         │   [SearchAPI]      [ClaudeAPI]     [ClaudeAPI]   [ClaudeAPI]
         │
         ▼
┌─────────────────┐
│  Final Report   │
└─────────────────┘
```

## 💻 Usage

### Basic Research

1. Enter a research topic in the input field
2. Click "Start Research" or press Enter
3. Watch the agents collaborate in real-time
4. Download the final report when complete

### With API Keys (Recommended)

1. Click "⚙️ Settings" in the top-right
2. Enter your API keys:
   - **Brave Search API Key**: For real web search
   - **Anthropic API Key**: For real AI analysis
3. Start your research

**Benefits of using real APIs:**
- Actual web search results with real sources
- AI-powered verification and synthesis
- Higher quality, more accurate reports
- Real insights and analysis

### Without API Keys (Demo Mode)

The system works perfectly without API keys using:
- Mock search results with realistic data
- Simulated AI analysis with sensible outputs
- Full workflow demonstration

**Perfect for:**
- Testing the system
- Understanding the architecture
- Demonstrating the concept

## 🛠️ Development

### Project Structure

```
multi-agent-research/
├── app/
│   ├── api/research/       # API endpoint
│   ├── page.tsx            # Main UI
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── lib/
│   ├── agents/             # Agent implementations
│   │   ├── BaseAgent.ts
│   │   ├── ResearcherAgent.ts
│   │   ├── FactCheckerAgent.ts
│   │   ├── SynthesizerAgent.ts
│   │   ├── CriticAgent.ts
│   │   └── AgentOrchestrator.ts
│   ├── services/           # External service integrations
│   │   ├── SearchService.ts
│   │   └── AIService.ts
│   └── types/              # TypeScript type definitions
└── package.json
```

### Adding New Agents

1. Create a new agent class extending `BaseAgent`
2. Implement the `processMessage()` method
3. Add the agent to the `AgentOrchestrator`
4. Update the UI to display the new agent

### Customizing the Workflow

Edit `AgentOrchestrator.ts` to:
- Change the agent sequence
- Add conditional routing
- Implement parallel processing
- Add new data transformations

## 📦 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `BRAVE_SEARCH_API_KEY`
   - `ANTHROPIC_API_KEY`
5. Deploy!

### Deploy Elsewhere

The app is a standard Next.js application and can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **Your own server** (with Node.js)

Build command: `npm run build`
Start command: `npm start`

## 🎯 Use Cases

- **Research**: Conduct comprehensive research on any topic
- **Content Creation**: Generate research-backed content
- **Due Diligence**: Verify information across sources
- **Learning**: Understand complex topics quickly
- **Portfolio**: Showcase AI/ML engineering skills

## 🌟 LinkedIn Demo Ideas

1. **Architecture Demo**: Show the agent collaboration flow
2. **Real vs Mock**: Compare results with and without APIs
3. **Live Research**: Research trending topics in real-time
4. **Code Walkthrough**: Explain the multi-agent system
5. **Performance**: Benchmark quality with different topics

## 🔧 Troubleshooting

### Port Already in Use
```bash
kill -9 $(lsof -ti:3000)
npm run dev
```

### API Keys Not Working
- Check `.env.local` exists and has correct keys
- Restart the development server after adding keys
- Verify keys are valid on provider websites

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## 📝 License

MIT License - Feel free to use for personal or commercial projects!

## 🙏 Credits

Built with:
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Brave Search API** - Web search
- **Anthropic Claude** - AI analysis

---

**Built by**: [Your Name]
**Portfolio**: [Your Portfolio Link]
**LinkedIn**: [Your LinkedIn]
**GitHub**: [Your GitHub]

⭐ Star this project if you found it helpful!
