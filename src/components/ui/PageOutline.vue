<script setup lang="ts">
export interface OutlineSection {
  id: string
  label: string
}

const { sections } = defineProps<{
  sections: OutlineSection[]
}>()

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
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
</template>
