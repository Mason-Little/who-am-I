<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProseBlock from '@/components/ui/ProseBlock.vue'
import SkillCard from '@/components/cards/SkillCard.vue'

const skills = {
  Languages: ['TypeScript', 'JavaScript', 'Python'],
  Frameworks: ['Vue', 'React'],
  Databases: ['PostgreSQL', 'MongoDB'],
  'LLM & AI Systems': [
    'LLM-powered tooling',
    'custom model fine-tuning',
    'embeddings',
    'retrieval-augmented generation (RAG)',
  ],
  'Vector Databases & Search': ['pgvector', 'Weaviate', 'Pinecone'],
  'API & Schema Tooling': ['REST APIs', 'OpenAPI', 'Postman'],
  'Infrastructure & Tooling': ['Docker', 'Git', 'Linux', 'CI pipelines'],
}

const sections = [
  { id: 'background', label: 'Background' },
  { id: 'scalar', label: 'Scalar' },
  { id: 'offline', label: 'Offline' },
  { id: 'skills', label: 'Tech Stack' },
]
</script>

<template>
  <PageLayout :sections="sections">
    <PageHeader
      title="About Me"
      subtitle="Full-stack engineer focused on systems, APIs, and applied AI. Also into cars."
    />

    <!-- Background Section -->
    <section id="background" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Background" />
      <ProseBlock>
        <p>Born in <span class="text-text-primary font-medium">Vancouver</span>.</p>
        <p>Grew up in <span class="text-text-primary font-medium">Squamish</span>.</p>
        <p>
          Started with <span class="text-text-primary font-medium">Lego Technic</span> and
          Mindstorms. Started building robots in elementary school. Wrote my first real line of
          Python in middle school.
        </p>
        <p>
          One of my projects was a scraper to find camping reservations for my cousins. That project
          led me to <span class="text-text-primary font-medium">Marc Laventure</span>.
        </p>
        <p>
          He mentored me for about a year and introduced me to
          <strong>Vue, JavaScript, and Machine Learning</strong> (before ChatGPT).
        </p>
        <p>
          Around the same time, I built a car classification app using a custom CNN. This was before
          ChatGPT and mainstream LLM tooling.
        </p>
      </ProseBlock>
    </section>

    <!-- Scalar Section -->
    <section id="scalar" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Scalar" />
      <ProseBlock>
        <p>
          When Marc founded <span class="text-text-primary font-medium">Scalar</span>, I joined as
          one of the first employees.
        </p>
        <p>
          Shortly after, ChatGPT launched and the problem space shifted. I moved deeper into
          production AI systems.
        </p>
        <p>Some of the work I did there:</p>
        <ul class="list-disc list-inside space-y-2 ml-4 marker:text-accent">
          <li>
            Built a model to generate API documentation directly from OpenAPI specs
            <ul class="list-disc list-inside ml-6 mt-1 text-text-secondary">
              <li>Used embeddings for document chunking to work around token limits</li>
            </ul>
          </li>
          <li>
            Fine-tuned a <span class="text-text-primary font-medium">Mistral 7B</span> model to
            reduce cost and latency while keeping generation private
          </li>
          <li>
            Built <strong>Agent Scalar</strong>
            <ul class="list-disc list-inside ml-6 mt-1 text-text-secondary">
              <li>Multi-agent system (4+ agents)</li>
              <li>PGVector for retrieval</li>
              <li>TypeScript and JSON Schema for execution constraints</li>
              <li>Allows users to execute real API workflows by querying OpenAPI documents</li>
            </ul>
          </li>
        </ul>
        <p class="text-text-secondary">
          Most of my work focused on reliability, execution safety, and scaling AI beyond simple
          Q&A.
        </p>
      </ProseBlock>
    </section>

    <!-- Offline Section -->
    <section id="offline" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Offline" />
      <ProseBlock>
        <p>When I'm not working on software, I'm usually in the garage.</p>
        <p>
          I'm currently rebuilding a
          <span class="text-text-primary font-medium">1992 Volvo 240</span>.
        </p>
        <p>LS-swapped. Twin-turbo 5.3L.</p>
        <p>Full teardown. Every nut and bolt.</p>
      </ProseBlock>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Tech Stack & Skills" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillCard
          v-for="(items, category) in skills"
          :key="category"
          :category="category.replace('_', ' ')"
          :skills="items"
        />
      </div>
    </section>
  </PageLayout>
</template>
