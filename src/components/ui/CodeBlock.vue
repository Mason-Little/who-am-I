<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code: string
  language?: string
}>()

const copied = ref(false)

const copyCode = async () => {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div
    class="relative group rounded-lg border border-border bg-surface-secondary/30 overflow-hidden my-6"
  >
    <!-- Header -->
    <div
      v-if="language"
      class="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-secondary/50"
    >
      <span class="text-xs font-medium text-text-secondary uppercase select-none">
        {{ language }}
      </span>

      <button
        @click="copyCode"
        class="text-xs text-text-secondary hover:text-text-primary transition-colors opacity-0 group-hover:opacity-100"
        title="Copy code"
      >
        <span v-if="copied">Copied!</span>
        <span v-else>Copy</span>
      </button>
    </div>

    <!-- No header copy button (absolute positioned if no language provided) -->
    <button
      v-else
      @click="copyCode"
      class="absolute top-2 right-2 px-2 py-1 rounded bg-surface-primary/80 text-xs text-text-secondary hover:text-text-primary transition-colors opacity-0 group-hover:opacity-100 z-10"
      title="Copy code"
    >
      <span v-if="copied">Copied!</span>
      <span v-else>Copy</span>
    </button>

    <!-- Code Content -->
    <div class="overflow-x-auto p-4">
      <pre class="font-mono text-sm leading-relaxed text-text-primary"><code>{{ code }}</code></pre>
    </div>
  </div>
</template>
