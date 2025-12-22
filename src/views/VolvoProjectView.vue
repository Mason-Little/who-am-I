<script setup lang="ts">
const specs = {
  engine: ['5.3L LS V8', 'Twin Turbo Setup', 'Custom Intake Manifold', 'Standalone ECU'],
  transmission: ['T56 6-Speed Manual', 'Custom Driveshaft', 'Upgraded Clutch'],
  suspension: ['Coilover Conversion', 'Adjustable Control Arms', 'Upgraded Sway Bars'],
  exterior: ['Custom Widebody', 'Period-Correct Wheels', 'Complete Respray'],
}

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'engine', label: 'Engine Build' },
  { id: 'progress', label: 'Progress' },
]

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
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
          <h1 class="text-4xl font-bold text-text-primary tracking-tight">
            # 1992 Volvo 240 LS Swap
          </h1>
          <p
            class="text-xl text-text-secondary leading-relaxed border-l-4 border-accent pl-4 italic"
          >
            > Taking a Swedish brick and giving it American muscle.
          </p>
        </section>

        <!-- Overview Section -->
        <section id="overview" class="space-y-6 scroll-mt-20">
          <h2 class="text-2xl font-semibold text-text-primary flex items-center gap-2">
            <span class="text-accent">##</span> The Vision
          </h2>
          <div class="prose prose-invert max-w-none text-text-secondary space-y-4 leading-7">
            <p>
              The <span class="text-text-primary font-medium">1992 Volvo 240</span> is a legend—a
              boxy, indestructible Swedish brick that refuses to die. My goal? Take its bulletproof
              chassis and drop in a
              <span class="text-text-primary font-medium">Twin Turbo 5.3L LS</span> to create the
              ultimate sleeper.
            </p>
            <p>
              This isn't just an engine swap—it's a complete rebuild. Every nut, every bolt, touched
              and upgraded. The result will be a car that looks like a daily driver but packs 600+
              horsepower under the hood.
            </p>
          </div>
        </section>

        <!-- Engine Build Section -->
        <section id="engine" class="space-y-6 scroll-mt-20">
          <h2 class="text-2xl font-semibold text-text-primary flex items-center gap-2">
            <span class="text-accent">##</span> Build Specifications
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(items, category) in specs"
              :key="category"
              class="bg-surface-secondary/30 rounded-lg p-6 border border-border hover:border-accent/50 transition-colors group"
            >
              <h3
                class="text-lg font-medium text-text-primary mb-4 capitalize group-hover:text-accent transition-colors"
              >
                {{ category }}
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="item in items"
                  :key="item"
                  class="text-text-secondary flex items-center gap-2"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Progress Section -->
        <section id="progress" class="space-y-6 scroll-mt-20">
          <h2 class="text-2xl font-semibold text-text-primary flex items-center gap-2">
            <span class="text-accent">##</span> Current Progress
          </h2>
          <div class="prose prose-invert max-w-none text-text-secondary leading-7">
            <p>
              The project is currently in the
              <span class="text-text-primary font-medium">fabrication phase</span>. The engine bay
              has been stripped and prepped, custom motor mounts are being fabricated, and the
              wiring harness is being built from scratch.
            </p>
            <p class="text-text-dim italic">More updates and photos coming soon...</p>
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
