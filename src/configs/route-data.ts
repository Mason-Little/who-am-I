import { z } from 'zod'

// File type styling configuration
export type FileType = 'TSX' | 'TS' | 'JSON' | 'LOG' | 'MD'

export const fileTypeColors: Record<FileType, string> = {
  TSX: '#e37933',
  TS: '#3178c6',
  JSON: '#f5c242',
  LOG: '#dcdcaa',
  MD: '#b072d1',
}

// Route configuration interface
export interface RouteConfig {
  path: string
  name: string
  fileName: string
  fileType: FileType
  title: string
  description: string
  parent?: string // For nested routes (e.g., 'projects')
  viewPath?: string // The Vue component file name (e.g., 'HomeView.vue')
  // New: Optional extended project data for Project Cards
  projectData?: {
    tags: string[]
    githubUrl?: string
    liveUrl?: string
  }
}

// Centralized route configuration - single source of truth
export const routeConfigs: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    fileName: 'home.tsx',
    fileType: 'TSX',
    title: 'Home',
    description:
      "Landing page with Mason's name, title (Full Stack Engineer, AI Enthusiast), and links to projects/about.",
    viewPath: 'HomeView.vue',
  },
  {
    path: '/about',
    name: 'About',
    fileName: 'about.md',
    fileType: 'MD',
    title: 'About',
    description:
      'Detailed bio including: origin story (Vancouver/Squamish, Lego Technic, Python), mentorship with Marc Laventure, Scalar work (AI documentation, Mistral fine-tuning, Agent Scalar multi-agent system), Volvo project, and full tech stack.',
    viewPath: 'AboutView.vue',
  },
  {
    path: '/contact',
    name: 'Contact',
    fileName: 'contact.json',
    fileType: 'JSON',
    title: 'Contact',
    description: 'Contact page with ways to reach Mason - email, phone, LinkedIn, GitHub, etc.',
    viewPath: 'ContactView.vue',
  },
  {
    path: '/projects',
    name: 'ProjectIndex',
    fileName: 'project-index.ts',
    fileType: 'TS',
    title: 'Projects',
    description:
      "Collection of Mason's software engineering projects including Content Writer, Agent Scalar, and portfolio work.",
    viewPath: 'ProjectIndex.vue',
    parent: 'projects',
  },
  {
    path: '/software/agent-scalar',
    name: 'AgentScalar', // Unique name
    fileName: 'agent-scalar.ts', // Dummy file name for IDE feel
    fileType: 'TS',
    title: 'Agent Scalar',
    description: 'A sophisticated multi-agent system using PG Vector, TypeScript, and JSON Schema.',
    viewPath: 'AgentScalarView.vue',
    parent: 'projects',
    projectData: {
      tags: ['TypeScript', 'PGVector', 'Multi-Agent', 'JSON Schema', 'AI Orchestration'],
    },
  },
  {
    path: '/projects/my-website',
    name: 'MyWebsite',
    fileName: 'my-website.ts',
    fileType: 'TS',
    title: 'Personal Website',
    description: "A meta-project about this portfolio site. Built with Vue 3, Tailwind, and details on the Agent Chat.",
    viewPath: 'MyWebsiteView.vue',
    parent: 'projects',
    projectData: {
      tags: ['Vue 3', 'TypeScript', 'Tailwind', 'Vite', 'Agentic UX'],
      githubUrl: 'https://github.com/Mason-Little/who-am-I',
    },
  },
  {
    path: '/projects/volvo',
    name: 'VolvoProject',
    fileName: 'volvo_240.log',
    fileType: 'LOG',
    title: 'Volvo 240 LS Swap',
    description:
      "My 1992 Volvo 240 project - LS-swapped with Twin Turbo 5.3L engine. Mechanical/car enthusiast content.",
    viewPath: 'VolvoView.vue',
    parent: 'projects',
    projectData: {
      tags: ['Volvo', '240', 'LS V8', 'Swap', 'Engine', 'Car'],
    },
  },
  {
    path: '/projects/a-better-way',
    name: 'ABetterWay',
    fileName: 'a-better-way.ts',
    fileType: 'TS',
    title: 'A Better Way',
    description:
      "A maps app that doesn't prioritize time but enjoyment. It takes you the route with the least standstill traffic.",
    viewPath: 'ABetterWayView.vue',
    parent: 'projects',
    projectData: {
      tags: ['Maps', 'Traffic', 'Navigation', 'App'],
      githubUrl: 'https://github.com/Mason-Little/a-better-way',
    },
  },
]

// Zod schemas for AI agent routing
export const pageNames = routeConfigs.map((r) => r.name) as [string, ...string[]]

export const viewDescriptions = z.object(
  Object.fromEntries(
    routeConfigs.map((r) => [r.name.toLowerCase(), z.string().describe(r.description)]),
  ) as Record<string, z.ZodString>,
)

export type PageName = (typeof routeConfigs)[number]['name']

export const routeSchema = z.object({
  selectedPage: z.enum(pageNames as [string, ...string[]]),
})
