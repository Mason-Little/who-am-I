import { z } from 'zod'
import type { Component } from 'vue'

// Dynamic view import using import.meta.glob
const viewModules = import.meta.glob('@/views/*.vue')
console.log(viewModules)

/**
 * Retrieves a Vue component dynamically based on the file path.
 * The path should be relative to `@/views/` (e.g., 'HomeView.vue').
 */
export const getViewComponent = (fileName: string): (() => Promise<Component>) | undefined => {
  const path = `/src/views/${fileName}`
  const module = viewModules[path]
  return module as (() => Promise<Component>) | undefined
}

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
    description: "Landing page with Mason's name, title (Full Stack Engineer, AI Enthusiast), and links to projects/about.",
    viewPath: 'HomeView.vue',
  },
  {
    path: '/about',
    name: 'About',
    fileName: 'about.md',
    fileType: 'MD',
    title: 'About',
    description: 'Detailed bio including: origin story (Vancouver/Squamish, Lego Technic, Python), mentorship with Marc Laventure, Scalar work (AI documentation, Mistral fine-tuning, Agent Scalar multi-agent system), Volvo project, and full tech stack.',
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
    description: "Collection of Mason's software engineering projects including Content Writer, Agent Scalar, and portfolio work.",
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
    parent: 'projects',
    projectData: {
        tags: ['TypeScript', 'PGVector', 'Multi-Agent', 'JSON Schema', 'AI Orchestration'],
    }
  },
      {
    path: '/', // Link to home for "Personal Website" card
    name: 'PersonalWebsite', // Unique name - careful with duplicates in route matching, maybe use a different "id" for cards vs routes
    fileName: 'my-website.tsx',
    fileType: 'TSX',
    title: 'Personal Website',
    description: 'This very website! A developer portfolio designed as an IDE interface.',
    parent: 'projects',
    projectData: {
        tags: ['Vue.js', 'TypeScript', 'Groq AI', 'Tailwind CSS'],
        githubUrl: 'https://github.com/Mason-Little/my-website',
        liveUrl: '/'
    }
  },
    {
    path: '/projects/volvo',
    name: 'VolvoProject',
    fileName: 'volvo_240.log',
    fileType: 'LOG',
    title: 'Volvo 240 LS Swap',
    description: "Mason's 1992 Volvo 240 project - LS-swapped with Twin Turbo 5.3L engine. Mechanical/car enthusiast content.",
    viewPath: 'VolvoView.vue',
    parent: 'projects',
    projectData: {
      tags: ['Volvo', '240', 'LS V8', 'Swap', 'Engine', 'Car'],
      githubUrl: 'https://github.com/Mason-Little/my-website',
      liveUrl: '/projects/volvo' // Self-referential for the project page
    }
  },

]

// Note: The above "ProjectIndex" items like 'ContentWriter' might clutter the router if we blindly map them.
// We should filter which ones are actual "Pages" vs just "Data" for cards.
// Convention: If `viewPath` is present, it's a renderable page.

// Helper functions
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routeConfigs.find((r) => r.path === path)
}

export const getFileName = (path: string): string => {
  return getRouteByPath(path)?.fileName ?? 'unknown'
}

export const getFileType = (path: string): FileType => {
  return getRouteByPath(path)?.fileType ?? 'TSX'
}

export const getFileColor = (path: string): string => {
  return fileTypeColors[getFileType(path)]
}

export const getRootRoutes = (): RouteConfig[] => {
  return routeConfigs.filter((r) => !r.parent)
}

export const getRoutesByParent = (parent: string): RouteConfig[] => {
  return routeConfigs.filter((r) => r.parent === parent)
}

// Zod schemas for AI agent routing
export const pageNames = routeConfigs.map((r) => r.name) as [string, ...string[]]

export const viewDescriptions = z.object(
  Object.fromEntries(
    routeConfigs.map((r) => [r.name.toLowerCase(), z.string().describe(r.description)])
  ) as Record<string, z.ZodString>
)

export type PageName = (typeof routeConfigs)[number]['name']

export const routeSchema = z.object({
  selectedPage: z.enum(pageNames as [string, ...string[]]),
})
