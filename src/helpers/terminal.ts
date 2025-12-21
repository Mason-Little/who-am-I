import { type Router } from 'vue-router'

export interface TerminalLine {
  type: 'command' | 'output'
  content: string
}

export interface CommandResult {
  lines: TerminalLine[]
  action?: 'clear'
}

type CommandHandler = (args: string[], router: Router) => CommandResult

// Independent commands
const helpCommand: CommandHandler = () => ({
  lines: [
    {
      type: 'output',
      content: `Available commands:
  cd <path>    Navigate to a section
  ls           List available sections
  cat <file>   View content (same as cd)
  clear        Clear terminal output
  whoami       Information about the user

💡 Tip: You can use this terminal to navigate the website!`,
    },
  ],
})

const lsCommand: CommandHandler = () => ({
  lines: [
    {
      type: 'output',
      content: `drwxr-xr-x  mason  projects
-rw-r--r--  mason  home.tsx
-rw-r--r--  mason  about.ts
-rw-r--r--  mason  blog/`,
    },
  ],
})

const whoamiCommand: CommandHandler = () => ({
  lines: [{ type: 'output', content: 'Mason Little - Software Engineer' }],
})

const clearCommand: CommandHandler = () => ({
  lines: [],
  action: 'clear',
})

const cdCommand: CommandHandler = (args, router) => {
  const path = args[1]
  if (!path) {
    router.push('/')
    return { lines: [] }
  }

  const cleanPath = path.replace('./', '')

  if (['home', 'home.tsx'].includes(cleanPath)) {
    router.push('/')
  } else if (['about', 'about.ts'].includes(cleanPath)) {
    router.push('/about')
  } else if (['projects', 'software'].includes(cleanPath)) {
    router.push('/projects/software')
  } else if (['volvo'].some((k) => cleanPath.includes(k))) {
    router.push('/projects/volvo-240')
  } else if (cleanPath === 'blog') {
    router.push('/blog')
  } else if (cleanPath === '..') {
    router.push('/')
  } else {
    return {
      lines: [{ type: 'output', content: `cd: no such file or directory: ${path}` }],
    }
  }
  return { lines: [] }
}

// Dependent commands
const catCommand: CommandHandler = (args, router) => {
  const path = args[1]
  if (!path) return { lines: [] }

  if (['home.tsx', 'about.ts', 'projects', 'blog'].some((k) => path.includes(k))) {
    const result = cdCommand(args, router)
    if (result.lines.length === 0) {
      return {
        lines: [{ type: 'output', content: `Opening ${path}...` }],
      }
    }
    return result
  } else {
    return {
      lines: [{ type: 'output', content: `cat: ${path}: No such file or directory` }],
    }
  }
}

// Registry
const commands: Record<string, CommandHandler> = {
  help: helpCommand,
  welcome: helpCommand, // Alias
  ls: lsCommand,
  ll: lsCommand, // Alias
  clear: clearCommand,
  whoami: whoamiCommand,
  cd: cdCommand,
  cat: catCommand,
}

export const processCommand = (input: string, router: Router): CommandResult => {
  const trimmed = input.trim()
  if (!trimmed) return { lines: [] }

  const args = trimmed.split(' ')
  const mainCommand = (args[0] || '').toLowerCase()

  const handler = commands[mainCommand]
  if (handler) {
    return handler(args, router)
  }

  return {
    lines: [{ type: 'output', content: `command not found: ${mainCommand}` }],
  }
}
