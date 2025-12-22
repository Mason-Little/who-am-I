<script setup lang="ts">
import ProjectCard from '@/components/ui/ProjectCard.vue'
import type { ProjectCardProps } from '@/components/ui/ProjectCard.vue'

//TODO: we need to make a view for each one of these projects
const projects: ProjectCardProps[] = [
  {
    title: 'Content Writer',
    description:
      'An AI-powered documentation generator that writes comprehensive API documentation from OpenAPI specifications. Uses embedding models for intelligent document splitting to handle token limits.',
    tags: ['TypeScript', 'OpenAI', 'Embeddings', 'OpenAPI', 'Vue.js'],
    routePath: '/software/content-writer',
  },
  {
    title: 'Agent Scalar',
    description:
      'A sophisticated multi-agent system using PG Vector, TypeScript, and JSON Schema. Enables users to execute complex tasks by querying OpenAPI documents through orchestrated AI workflows with 4+ cooperating agents.',
    tags: ['TypeScript', 'PGVector', 'Multi-Agent', 'JSON Schema', 'AI Orchestration'],
    routePath: '/software/agent-scalar',
  },
  {
    title: 'Personal Website',
    description:
      'This very website! A developer portfolio designed as an IDE interface with an AI chat assistant. Built with Vue 3, TypeScript, and integrated with Groq AI for intelligent interactions.',
    tags: ['Vue.js', 'TypeScript', 'Groq AI', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Mason-Little/my-website',
    liveUrl: '/',
  },
]
</script>

<template>
  <div class="px-6 py-8 relative">
    <div class="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
      <!-- Header Section -->
      <section class="space-y-4">
        <h1 class="text-4xl font-bold text-text-primary tracking-tight"># Software Projects</h1>
        <p class="text-xl text-text-secondary leading-relaxed border-l-4 border-accent pl-4 italic">
          > A collection of AI-powered tools and applications I've built.
        </p>
      </section>

      <!-- Projects Grid -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-text-primary flex items-center gap-2">
          <span class="text-accent">##</span> Featured Projects
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProjectCard v-for="project in projects" :key="project.title" v-bind="project" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
