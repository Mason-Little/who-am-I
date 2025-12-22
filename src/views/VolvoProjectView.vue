<script setup lang="ts">
import PageLayout from '@/components/ui/PageLayout.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProseBlock from '@/components/ui/ProseBlock.vue'

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
</script>

<template>
  <PageLayout :sections="sections">
    <PageHeader
      title="1992 Volvo 240 LS Swap"
      subtitle="Taking a Swedish brick and giving it American muscle."
    />

    <!-- Overview Section -->
    <section id="overview" class="space-y-6 scroll-mt-20">
      <SectionHeader title="The Vision" />
      <ProseBlock>
        <p>
          The <span class="text-text-primary font-medium">1992 Volvo 240</span> is a legend—a boxy,
          indestructible Swedish brick that refuses to die. My goal? Take its bulletproof chassis
          and drop in a <span class="text-text-primary font-medium">Twin Turbo 5.3L LS</span> to
          create the ultimate sleeper.
        </p>
        <p>
          This isn't just an engine swap—it's a complete rebuild. Every nut, every bolt, touched and
          upgraded. The result will be a car that looks like a daily driver but packs 600+
          horsepower under the hood.
        </p>
      </ProseBlock>
    </section>

    <!-- Engine Build Section -->
    <section id="engine" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Build Specifications" />
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
      <SectionHeader title="Current Progress" />
      <ProseBlock>
        <p>
          The project is currently in the
          <span class="text-text-primary font-medium">fabrication phase</span>. The engine bay has
          been stripped and prepped, custom motor mounts are being fabricated, and the wiring
          harness is being built from scratch.
        </p>
        <p class="text-text-dim italic">More updates and photos coming soon...</p>
      </ProseBlock>
    </section>
  </PageLayout>
</template>
