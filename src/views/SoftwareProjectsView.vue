<script setup lang="ts">
import PageLayout from '@/components/ui/PageLayout.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
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
  <PageLayout>
    <PageHeader
      title="Software Projects"
      subtitle="A collection of AI-powered tools and applications I've built."
    />

    <!-- Projects Grid -->
    <section class="space-y-6">
      <SectionHeader title="Featured Projects" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectCard v-for="project in projects" :key="project.title" v-bind="project" />
      </div>
    </section>
  </PageLayout>
</template>
