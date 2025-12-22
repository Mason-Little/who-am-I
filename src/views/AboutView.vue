<script setup lang="ts">
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

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    // Offset for the fixed headers if necessary
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="px-6 py-8 relative">
    <div class="max-w-7xl mx-auto flex gap-12 items-start">
      <!-- Main Content -->
      <div class="flex-1 min-w-0 space-y-15 animate-fade-in pb-20">
        <!-- Header Section -->
        <section class="space-y-4">
          <h1 class="text-4xl font-bold text-text-primary tracking-tight"># About Me</h1>
          <p
            class="text-xl text-text-secondary leading-relaxed border-l-4 border-accent pl-4 italic"
          >
            > Full Stack Engineer, AI Specialist, and Car Enthusiast.
          </p>
        </section>

        <!-- Bio Section -->
        <section id="origin" class="space-y-6 scroll-mt-20">
          <h2 class="text-2xl font-semibold text-text-primary flex items-center gap-2">
            <span class="text-accent">##</span> The Origin Story
          </h2>
          <div class="prose prose-invert max-w-none text-text-secondary space-y-4 leading-7">
            <p>
              I was born in <span class="text-text-primary font-medium">Vancouver</span> and moved
              to <span class="text-text-primary font-medium">Squamish</span> at a young age. My
              engineering journey started early—not with code, but with
              <span class="text-text-primary font-medium">Lego Technic</span> and Mindstorms robots.
              This passion for building carried me through middle school robotics competitions and
              eventually into high school, where I wrote my first line of Python.
            </p>
            <p>
              What started as simple scripting evolved into building scrapers to find camping sites
              for my cousins. This project connected me with
              <span class="text-text-primary font-medium">Marc Laventure</span>, who took me under
              his wing. For a year, he mentored me in the fundamentals of Software Engineering,
              teaching me <strong>Vue.js, JavaScript, and Python</strong>.
            </p>
            <p>
              During this time, I combined my love for code with my passion for cars by building a
              car classification app using a custom CNN fine-tuning layer. This was in the "old
              world" before ChatGPT changed everything.
            </p>
          </div>
        </section>

        <!-- Scalar Section -->
        <section id="scalar" class="space-y-6 scroll-mt-20">
          <h2 class="text-2xl font-semibold text-text-primary flex items-center gap-2">
            <span class="text-accent">##</span> The Scalar Era
          </h2>
          <div class="prose prose-invert max-w-none text-text-secondary space-y-4 leading-7">
            <p>
              When Marc founded <span class="text-text-primary font-medium">Scalar</span>, I joined
              as one of the first employees. Then ChatGPT released, and the landscape shifted. I
              dove headfirst into production-scale AI:
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
          </div>
        </section>

        <!-- Side Projects Section -->
        <section id="offline" class="space-y-6 scroll-mt-20">
          <h2 class="text-2xl font-semibold text-text-primary flex items-center gap-2">
            <span class="text-accent">##</span> Offline Projects
          </h2>
          <div class="prose prose-invert max-w-none text-text-secondary leading-7">
            <p>
              When I'm not orchestrating AI agents, I'm usually in the garage. I'm currently working
              on a
              <span class="text-text-primary font-medium">1992 Volvo 240</span>, which I've
              LS-swapped with a
              <span class="text-text-primary font-medium">Twin Turbo 5.3L LS</span> engine. It's a
              complete rebuild—every nut and bolt.
            </p>
          </div>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="space-y-6 scroll-mt-20">
          <h2 class="text-2xl font-semibold text-text-primary flex items-center gap-2">
            <span class="text-accent">##</span> Tech Stack & Skills
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(items, category) in skills"
              :key="category"
              class="bg-surface-secondary/30 rounded-lg p-6 border border-border hover:border-accent/50 transition-colors group"
            >
              <h3
                class="text-lg font-medium text-text-primary mb-4 capitalize group-hover:text-accent transition-colors"
              >
                {{ category.replace('_', ' ') }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in items"
                  :key="skill"
                  class="px-3 py-1 text-sm rounded bg-surface-primary text-text-secondary border border-border group-hover:border-accent/30 transition-colors"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Minimap / Table of Contents -->
      <aside class="hidden xl:block w-40 shrink-0 sticky top-8">
        <div class="border-l border-border pl-6 py-2">
          <h3 class="text-xs font-bold text-text-dim mb-4 uppercase tracking-widest">Outline</h3>
          <nav>
            <ul class="space-y-3">
              <li v-for="section in sections" :key="section.id">
                <button
                  @click="scrollToSection(section.id)"
                  class="group flex items-center gap-3 text-sm text-text-secondary hover:text-accent text-left transition-colors w-full"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-accent transition-colors"
                  ></span>
                  {{ section.label }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
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
