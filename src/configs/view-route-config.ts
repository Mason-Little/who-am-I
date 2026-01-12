
import type { Component } from 'vue'
import {
  routeConfigs,
  fileTypeColors,
  type FileType,
  type RouteConfig,
  type PageName,
  pageNames,
  viewDescriptions,
  routeSchema,
} from './route-data'

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

// Re-export types and data for convenience, though consumers should prioritize route-data if they don't need Vue stuff
export {
  routeConfigs,
  fileTypeColors,
  type FileType,
  type RouteConfig,
  type PageName,
  pageNames,
  viewDescriptions,
  routeSchema,
}

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

