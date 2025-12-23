<script setup lang="ts">
import { ref, onMounted } from 'vue'

const name = ref('')
const fullName = '${Mason}'
const showCursor = ref(true)

const typeText = async () => {
  // Initial delay before typing starts
  await new Promise((resolve) => setTimeout(resolve, 500))

  for (let i = 0; i <= fullName.length; i++) {
    name.value = fullName.slice(0, i)
    // Random typing delay for realism
    await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100))
  }
}

onMounted(() => {
  typeText()
  // Cursor blinking interval
  setInterval(() => {
    showCursor.value = !showCursor.value
  }, 530)
})
</script>

<template>
  <div class="relative h-full flex flex-col items-center justify-center p-8 overflow-hidden">
    <div class="relative z-10 text-center space-y-8">
      <h2
        class="text-2xl md:text-3xl font-medium text-text-secondary animate-fade-in-up"
        style="animation-delay: 100ms"
      >
        Hello, my name is
      </h2>

      <h1
        class="text-6xl md:text-8xl font-bold font-mono tracking-tight animate-fade-in-up min-h-[1.2em]"
        style="animation-delay: 200ms"
      >
        <span
          class="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent"
        >
          {{ name }}
        </span>
        <span
          class="text-accent inline-block w-[0.5em] align-baseline transition-opacity duration-100"
          :class="{ 'opacity-0': !showCursor, 'opacity-100': showCursor }"
        >
          _
        </span>
      </h1>

      <p
        class="text-text-dim text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
        style="animation-delay: 300ms"
      >
        Full Stack Engineer • AI Enthusiast
      </p>

      <div
        class="flex gap-4 justify-center mt-8 text-sm font-mono animate-fade-in-up"
        style="animation-delay: 400ms"
      >
        <router-link
          to="/projects"
          class="group relative px-8 py-3 overflow-hidden rounded bg-transparent transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)] border border-accent text-accent"
        >
          <span
            class="absolute inset-0 w-full h-full bg-accent/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
          ></span>
          <span class="relative">View Projects</span>
        </router-link>

        <router-link
          to="/about"
          class="group px-8 py-3 border border-border text-text-secondary hover:text-text-primary hover:border-text-primary transition-all duration-300 rounded hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          About Me
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0; /* Start hidden */
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
</style>
