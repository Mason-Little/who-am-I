<template>
  <div class="h-full flex flex-col items-center justify-center p-8">
    <div class="text-center space-y-6">
      <h2
        class="text-2xl md:text-3xl font-medium text-text-secondary animate-fade-in-up"
        style="animation-delay: 100ms"
      >
        Hello, my name is
      </h2>

      <h1
        class="text-6xl md:text-8xl font-bold font-mono tracking-tight animate-fade-in-up"
        style="animation-delay: 200ms"
      >
        <span
          class="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent"
        >
          ${Mason}
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
          to="/projects/software"
          class="px-6 py-3 border border-accent text-accent hover:bg-accent/10 transition-colors rounded"
        >
          View Projects
        </router-link>
        <router-link
          to="/about"
          class="px-6 py-3 border border-border text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors rounded"
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
