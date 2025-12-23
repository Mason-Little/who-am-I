<script setup lang="ts">
import { computed } from 'vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProjectCard from '@/components/cards/ProjectCard.vue'
import type { ProjectCardProps } from '@/components/cards/ProjectCard.vue'
import { routeConfigs } from '@/configs/view-route-config'

// Map route configurations to project cards
const projects = computed<ProjectCardProps[]>(() => {
  return routeConfigs
    .filter((route) => route.parent === 'projects' || route.projectData) // Filter for projects
    .filter((route) => route.name !== 'ProjectIndex') // Exclude the index page itself
    .map((route) => ({
      title: route.title,
      description: route.description,
      tags: route.projectData?.tags || [],
      routePath: route.viewPath ? route.path : undefined, // Internal route if view exists
      githubUrl: route.projectData?.githubUrl,
      liveUrl: route.projectData?.liveUrl,
    }))
})
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
