<template>
  <div class="h-full flex flex-col items-center justify-center p-8">
    <div class="text-center space-y-6">
      <h2 class="text-2xl md:text-3xl font-medium text-text-secondary">Hello, my name is</h2>

      <h1 class="text-6xl md:text-8xl font-bold font-mono tracking-tight">
        <span
          class="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent"
        >
          ${Mason}
        </span>
      </h1>

      <p class="text-text-dim text-xl max-w-2xl mx-auto leading-relaxed">
        Full Stack Engineer • AI Enthusiast • System Architect
      </p>

      <div class="flex gap-4 justify-center mt-8 text-sm font-mono">
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
