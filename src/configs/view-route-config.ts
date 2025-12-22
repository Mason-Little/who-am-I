import { z } from 'zod'
import type { Component } from 'vue'

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
  parent?: string // For nested routes (e.g., 'projects' or 'blog')
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
  },
  {
    path: '/about',
    name: 'About',
    fileName: 'about.ts',
    fileType: 'TS',
    title: 'About',
    description: 'Detailed bio including: origin story (Vancouver/Squamish, Lego Technic, Python), mentorship with Marc Laventure, Scalar work (AI documentation, Mistral fine-tuning, Agent Scalar multi-agent system), Volvo project, and full tech stack.',
  },
  {
    path: '/contact',
    name: 'Contact',
    fileName: 'contact.json',
    fileType: 'JSON',
    title: 'Contact',
    description: 'Contact page with ways to reach Mason - email, phone, LinkedIn, GitHub, etc.',
  },
  {
    path: '/projects/software',
    name: 'SoftwareProjects',
    fileName: 'software.tsx',
    fileType: 'TSX',
    title: 'Software Projects',
    description: "Collection of Mason's software engineering projects including Content Writer, Agent Scalar, and portfolio work.",
    parent: 'projects',
  },
  {
    path: '/projects/volvo-240',
    name: 'VolvoProject',
    fileName: 'volvo_240.log',
    fileType: 'LOG',
    title: 'Volvo 240 LS Swap',
    description: "Mason's 1992 Volvo 240 project - LS-swapped with Twin Turbo 5.3L engine. Mechanical/car enthusiast content.",
    parent: 'projects',
  },
  {
    path: '/blog',
    name: 'Blog',
    fileName: 'README.md',
    fileType: 'MD',
    title: 'Blog',
    description: 'Blog posts about AI, engineering, and technology.',
    parent: 'blog',
  },
]

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

// For router setup - lazy load components
export const createRouterRoutes = (components: Record<string, Component>) => {
  return routeConfigs.map((config) => ({
    path: config.path,
    name: config.name,
    component: components[config.name],
    meta: { title: config.title },
  }))
}
