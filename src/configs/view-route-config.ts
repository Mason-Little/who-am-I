import { z } from 'zod'

export const viewDescriptions = z.object({
  home: z.string().describe('Landing page with Mason\'s name, title (Full Stack Engineer, AI Enthusiast), and links to projects/about.'),

  about: z.string().describe('Detailed bio including: origin story (Vancouver/Squamish, Lego Technic, Python), mentorship with Marc Laventure, Scalar work (AI documentation, Mistral fine-tuning, Agent Scalar multi-agent system), Volvo project, and full tech stack (TypeScript, Python, Vue, OpenAI, Vector DBs, etc).'),

  volvo: z.string().describe('Mason\'s 1992 Volvo 240 project - LS-swapped with Twin Turbo 5.3L engine. Mechanical/car enthusiast content.'),

  blog: z.string().describe('Blog posts about AI, engineering, and technology.'),

  softwareProjects: z.string().describe('Collection of Mason\'s software engineering projects and portfolio work.'),

  contact: z.string().describe('Contact page with ways to reach Mason - email, LinkedIn, GitHub, etc.'),
})

export type PageName = keyof z.infer<typeof viewDescriptions>

export const routeSchema = z.object({
  selectedPage: z.enum(['home', 'about', 'volvo', 'blog', 'softwareProjects', 'contact']),
})
