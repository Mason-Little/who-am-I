<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const showCursor = ref(true)

const goHome = () => {
  router.push('/')
}

onMounted(() => {
  setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
})
</script>

<template>
  <div class="not-found-container">
    <div class="noise-overlay"></div>
    <div class="content-wrapper">
      <div class="glitch-wrapper">
        <h1 class="glitch" data-text="404">404</h1>
      </div>

      <div class="terminal-output">
        <p>> <span class="cmd">ERROR_CODE:</span> <span class="value">PAGE_NOT_FOUND</span></p>
        <p>> <span class="cmd">LOCATION:</span> <span class="value">UNKNOWN_SECTOR</span></p>
        <p>> <span class="cmd">SYSTEM_STATUS:</span> <span class="crit">CRITICAL_FAILURE</span></p>
        <p class="mt-4">
          > <span class="cmd">RECOMMENDED_ACTION:</span>
          <span class="value">INITIATE_RETURN_SEQUENCE</span
          ><span class="cursor" :class="{ 'opacity-0': !showCursor }">_</span>
        </p>
      </div>

      <button @click="goHome" class="return-button group">
        <span class="button-content">
          <span class="bracket">[</span> REBOOT_SYSTEM <span class="bracket">]</span>
        </span>
        <div class="button-glitch"></div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Position absolute relative to the <main> editor area */
  position: absolute;
  inset: 0;
  z-index: 50;
  background-color: #0d1117;
  color: var(--color-text-primary);
  overflow: hidden;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Simpler grain effect using CSS gradients */
  background:
    radial-gradient(circle at center, transparent 0%, #000 100%),
    repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 1px,
      rgba(255, 255, 255, 0.05) 1px,
      rgba(255, 255, 255, 0.05) 2px
    );
  opacity: 0.3;
  pointer-events: none;
  z-index: 1;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* Glitch Effect */
.glitch-wrapper {
  position: relative;
}

.glitch {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  position: relative;
  color: var(--color-text-primary);
  letter-spacing: -0.05em;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-bg-primary);
}

.glitch::before {
  left: 2px;
  text-shadow: -1px 0 var(--color-error);
  clip-path: inset(24% 0 29% 0);
  animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -1px 0 var(--color-accent);
  clip-path: inset(85% 0 3% 0);
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
}

@keyframes glitch-anim-1 {
  0% {
    clip-path: inset(80% 0 2% 0);
  }
  20% {
    clip-path: inset(20% 0 55% 0);
  }
  40% {
    clip-path: inset(50% 0 25% 0);
  }
  60% {
    clip-path: inset(10% 0 85% 0);
  }
  80% {
    clip-path: inset(40% 0 5% 0);
  }
  100% {
    clip-path: inset(70% 0 15% 0);
  }
}

@keyframes glitch-anim-2 {
  0% {
    clip-path: inset(15% 0 60% 0);
  }
  20% {
    clip-path: inset(85% 0 5% 0);
  }
  40% {
    clip-path: inset(5% 0 90% 0);
  }
  60% {
    clip-path: inset(35% 0 35% 0);
  }
  80% {
    clip-path: inset(95% 0 2% 0);
  }
  100% {
    clip-path: inset(25% 0 50% 0);
  }
}

/* Terminal Output */
.terminal-output {
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  min-width: 300px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.terminal-output p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.cmd {
  color: var(--color-accent);
  font-weight: 600;
}

.value {
  color: var(--color-success);
}

.crit {
  color: var(--color-error);
  animation: blink 2s infinite;
}

.cursor {
  display: inline-block;
  color: var(--color-accent);
  font-weight: bold;
}

/* Button */
.return-button {
  margin-top: 1rem;
  background: transparent;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  padding: 0.75rem 2rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}

.return-button:hover {
  background: var(--color-accent);
  color: var(--color-bg-primary);
  box-shadow: 0 0 15px var(--color-accent-hover);
}

.return-button:hover .bracket {
  opacity: 0.6;
}

.bracket {
  opacity: 0.4;
  margin: 0 0.5rem;
  transition: opacity 0.2s;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
