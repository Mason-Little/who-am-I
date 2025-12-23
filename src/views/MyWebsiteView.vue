<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProseBlock from '@/components/ui/ProseBlock.vue'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features & Inspiration' },
  { id: 'tech', label: 'Tech Stack' },
]
</script>

<template>
  <PageLayout :sections="sections">
    <PageHeader
      title="My Website"
      subtitle="A meta-project about this project."
      github-url="https://github.com/Mason-Little/my-website"
    />

    <section id="overview" class="space-y-8 scroll-mt-20">
      <SectionHeader title="The Concept" />
      <ProseBlock>
        <p>
          I thought it would be fun to create a website inspired by the tools we use every day: VS
          Code + Cursor. This entire project was a 3-day sprint, built using my preferred and most
          comfortable tech stack to see what I could achieve in a short timeframe.
        </p>
      </ProseBlock>
    </section>

    <section id="features" class="space-y-8 scroll-mt-20">
      <SectionHeader title="Features & Inspiration" />

      <ProseBlock>
        <h3 class="text-xl font-medium text-text-primary mb-2">Context-Aware Agent Chat</h3>
        <p>
          The core feature is the agent chat. It's not just a standard chatbot; it's context-aware.
          First, it looks at what the user is asking. Then, at runtime, it actively grabs the text
          content from the page you are currently viewing. This allows it to answer specific
          questions about the content right in front of you, just like an intelligent coding
          assistant.
        </p>
      </ProseBlock>

      <ProseBlock>
        <h3 class="text-xl font-medium text-text-primary mb-2">Easter Eggs & Interactions</h3>
        <p>
          The site is packed with little interactions. You can drag elements around, explore the
          "stack" visually, and find hidden details that make the experience feel alive and dynamic.
        </p>
      </ProseBlock>
    </section>

    <section id="tech" class="space-y-8 scroll-mt-20">
      <SectionHeader title="The Stack" />
      <ProseBlock>
        <p>I stuck to what I know and love to move fast:</p>
        <ul class="list-disc list-inside space-y-1 ml-4 text-text-secondary">
          <li><strong>Vue 3</strong> for the reactive UI.</li>
          <li><strong>TypeScript</strong> for type safety and developer sanity.</li>
          <li><strong>Tailwind CSS</strong> (v4) for rapid, beautiful styling.</li>
          <li><strong>Vite</strong> for lightning-fast builds.</li>
          <li><strong>Motion</strong> for those smooth, premium animations.</li>
        </ul>
      </ProseBlock>
    </section>
  </PageLayout>
</template>
