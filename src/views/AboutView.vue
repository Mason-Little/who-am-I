<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProseBlock from '@/components/ui/ProseBlock.vue'
import SkillCard from '@/components/cards/SkillCard.vue'

const skills = {
  languages: ['TypeScript', 'JavaScript', 'Python', 'Vue.js', 'HTML/CSS'],
  ai_ml: [
    'OpenAI API',
    'Mistral 7B Fine-tuning',
    'Embeddings',
    'Vector Databases (PGVector)',
    'Prompt Engineering',
    'Multi-Agent Systems',
  ],
  backend: ['Node.js', 'API Design', 'OpenAPI/Swagger', 'PostgreSQL'],
  tools: ['Git', 'Lego Technic/Mindstorms (The OG)', 'Wrenching on Volvos'],
}

const sections = [
  { id: 'origin', label: 'Origin Story' },
  { id: 'scalar', label: 'The Scalar Era' },
  { id: 'offline', label: 'Offline Projects' },
  { id: 'skills', label: 'Tech Stack' },
]
</script>

<template>
  <PageLayout :sections="sections">
    <PageHeader
      title="About Me"
      subtitle="Full Stack Engineer, AI Specialist, and Car Enthusiast."
    />

    <!-- Bio Section -->
    <section id="origin" class="space-y-6 scroll-mt-20">
      <SectionHeader title="The Origin Story" />
      <ProseBlock>
        <p>
          I was born in <span class="text-text-primary font-medium">Vancouver</span> and moved to
          <span class="text-text-primary font-medium">Squamish</span> at a young age. My engineering
          journey started early—not with code, but with
          <span class="text-text-primary font-medium">Lego Technic</span> and Mindstorms robots.
          This passion for building carried me through middle school robotics competitions and
          eventually into high school, where I wrote my first line of Python.
        </p>
        <p>
          What started as simple scripting evolved into building scrapers to find camping sites for
          my cousins. This project connected me with
          <span class="text-text-primary font-medium">Marc Laventure</span>, who took me under his
          wing. For a year, he mentored me in the fundamentals of Software Engineering, teaching me
          <strong>Vue.js, JavaScript, and Python</strong>.
        </p>
        <p>
          During this time, I combined my love for code with my passion for cars by building a car
          classification app using a custom CNN fine-tuning layer. This was in the "old world"
          before ChatGPT changed everything.
        </p>
      </ProseBlock>
    </section>

    <!-- Scalar Section -->
    <section id="scalar" class="space-y-6 scroll-mt-20">
      <SectionHeader title="The Scalar Era" />
      <ProseBlock>
        <p>
          When Marc founded <span class="text-text-primary font-medium">Scalar</span>, I joined as
          one of the first employees. Then ChatGPT released, and the landscape shifted. I dove
          headfirst into production-scale AI:
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4 marker:text-accent">
          <li>
            Built a custom model to write API documentation from OpenAPI specs (using embedding
            models for document splitting to handle low token limits).
          </li>
          <li>
            Fine-tuned a <span class="text-text-primary font-medium">Mistral 7B</span> model for
            faster, cheaper, and more secure/private document generation.
          </li>
          <li>
            Developed <strong>Agent Scalar</strong>: A sophisticated system using PG Vector,
            TypeScript, JSON Schema, and multi-agent workflows (4+ agents) that allows users to
            execute complex tasks by querying OpenAPI documents.
          </li>
        </ul>
      </ProseBlock>
    </section>

    <!-- Side Projects Section -->
    <section id="offline" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Offline Projects" />
      <ProseBlock>
        <p>
          When I'm not orchestrating AI agents, I'm usually in the garage. I'm currently working on
          a
          <span class="text-text-primary font-medium">1992 Volvo 240</span>, which I've LS-swapped
          with a <span class="text-text-primary font-medium">Twin Turbo 5.3L LS</span> engine. It's
          a complete rebuild—every nut and bolt.
        </p>
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
