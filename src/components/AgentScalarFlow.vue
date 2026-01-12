<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

// --- Types ---
type Stage = 'prompt' | 'intents' | 'operations' | 'plan' | 'result' | 'readmore'

interface FlowItem {
  id: string
  label: string
  response?: string
  status?: 'pending' | 'running' | 'complete'
}

interface TableRow {
  playlist: string
  track: string
  artist: string
}

// --- Data ---
const STAGES: Stage[] = ['prompt', 'intents', 'operations', 'plan', 'result', 'readmore']

// Prompt shown as a single item that morphs into intents
const PROMPT_ITEM: FlowItem[] = [
  {
    id: 'user_prompt',
    label: '"Get my gym playlist, add the top Kendrick Lamar song, show all songs as a table"',
  },
]

const INTENTS: FlowItem[] = [
  { id: 'get_playlists', label: 'get playlists' },
  { id: 'get_top_songs', label: 'get top songs' },
  { id: 'list_playlist_tracks', label: 'list playlist tracks' },
  { id: 'format_results', label: 'format results as table' },
]

const OPERATIONS: FlowItem[] = [
  { id: 'list_playlists', label: 'list playlists' },
  { id: 'search_artist', label: 'search artists' },
  { id: 'get_top_songs', label: 'get top songs' },
  { id: 'add_track', label: 'add track to playlist' },
  { id: 'get_playlist_tracks', label: 'get playlist tracks' },
  { id: 'format_results', label: 'format results as table' },
]

const PLAN_STEPS: FlowItem[] = [
  {
    id: 'step_1',
    label: 'list all playlists',
    response: '✓ GET /me/playlists → Found 4 playlists: Gym, Chill, Focus, Party',
  },
  {
    id: 'step_2',
    label: 'resolve target playlist',
    response: '✓ Matched "gym" → Selected playlist_id: pl_gym_8x2k',
  },
  {
    id: 'step_3',
    label: 'search artist',
    response: '✓ GET /search?q=Kendrick+Lamar → Found artist_id: ar_kdot_1987',
  },
  {
    id: 'step_4',
    label: 'get top songs',
    response: '✓ GET /artists/ar_kdot_1987/top-tracks → HUMBLE., DNA., Alright, Money Trees',
  },
  {
    id: 'step_5',
    label: 'add song to playlist',
    response: '✓ POST /playlists/pl_gym_8x2k/tracks → Added track_id: tr_humble_01',
  },
  {
    id: 'step_6',
    label: 'list playlist tracks',
    response: '✓ GET /playlists/*/tracks → Retrieved 8 tracks across Gym and Chill',
  },
  {
    id: 'step_7',
    label: 'format table',
    response: '✓ Rendering tracks as table with playlist, track, and artist columns',
  },
]

const RESULT_DATA: TableRow[] = [
  { playlist: 'Gym', track: 'HUMBLE.', artist: 'Kendrick Lamar' },
  { playlist: 'Gym', track: 'DNA.', artist: 'Kendrick Lamar' },
  { playlist: 'Gym', track: 'Alright', artist: 'Kendrick Lamar' },
  { playlist: 'Chill', track: 'Nights', artist: 'Frank Ocean' },
  { playlist: 'Chill', track: 'Ivy', artist: 'Frank Ocean' },
]

// --- State ---
const currentStageIndex = ref(0)
const autoplayTimer = ref<number | null>(null)
const planStepIndex = ref(0)
const planStepTimer = ref<number | null>(null)

// For list transitions (FLIP)
const [parent] = useAutoAnimate()

// --- Computed ---
const currentStage = computed(() => STAGES[currentStageIndex.value])

const currentTitle = computed(() => {
  switch (currentStage.value) {
    case 'prompt':
      return '1. User Prompt'
    case 'intents':
      return '2. Query Handling'
    case 'operations':
      return '3. Dependency Expansion'
    case 'plan':
      return '4. Execution'
    case 'result':
      return '5. Result'
    case 'readmore':
      return '6. Learn More'
    default:
      return ''
  }
})

const MAX_VISIBLE_STEPS = 4

const visiblePlanSteps = computed(() => {
  const allSteps = PLAN_STEPS.slice(0, planStepIndex.value + 1).map((step, idx) => ({
    ...step,
    status: idx < planStepIndex.value ? 'complete' : 'running',
  }))

  // Sliding window: show last MAX_VISIBLE_STEPS items
  if (allSteps.length > MAX_VISIBLE_STEPS) {
    return allSteps.slice(-MAX_VISIBLE_STEPS)
  }
  return allSteps
})

// --- Methods ---
const next = () => {
  if (currentStageIndex.value < STAGES.length - 1) {
    currentStageIndex.value++

    // Reset plan animation when entering plan stage
    if (currentStage.value === 'plan') {
      planStepIndex.value = 0
      startPlanAnimation()
    }
  } else {
    // Loop back to start
    currentStageIndex.value = 0
    planStepIndex.value = 0
  }
}

const startAutoplay = () => {
  if (autoplayTimer.value) clearInterval(autoplayTimer.value)
  autoplayTimer.value = window.setInterval(() => {
    // Don't auto-advance during plan animation
    if (currentStage.value === 'plan' && planStepIndex.value < PLAN_STEPS.length - 1) {
      return
    }
    next()
  }, 3500)
}

const stopAutoplay = () => {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value)
    autoplayTimer.value = null
  }
}

const startPlanAnimation = () => {
  if (planStepTimer.value) clearInterval(planStepTimer.value)
  planStepIndex.value = 0

  planStepTimer.value = window.setInterval(() => {
    if (planStepIndex.value < PLAN_STEPS.length - 1) {
      planStepIndex.value++
    } else {
      if (planStepTimer.value) {
        clearInterval(planStepTimer.value)
        planStepTimer.value = null
      }
    }
  }, 1200)
}

const stopPlanAnimation = () => {
  if (planStepTimer.value) {
    clearInterval(planStepTimer.value)
    planStepTimer.value = null
  }
}

const goToStage = (index: number) => {
  currentStageIndex.value = index

  if (STAGES[index] === 'plan') {
    planStepIndex.value = 0
    startPlanAnimation()
  } else {
    stopPlanAnimation()
  }
}

const scrollToEarlyApproach = () => {
  const element = document.getElementById('early-approach')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Start autoplay on mount
onMounted(() => {
  startAutoplay()
})

// Cleanup
onUnmounted(() => {
  stopAutoplay()
  stopPlanAnimation()
})
</script>

<template>
  <div
    class="not-prose w-full mx-auto rounded-xl border border-border bg-surface-primary shadow-sm overflow-hidden flex flex-col h-[420px]"
  >
    <!-- Header -->
    <div
      class="px-6 py-4 border-b border-border bg-surface-secondary/30 flex items-center justify-between"
    >
      <h3 class="font-medium text-text-primary">{{ currentTitle }}</h3>
      <div class="flex gap-1">
        <button
          v-for="(_, idx) in STAGES"
          :key="idx"
          @click="goToStage(idx)"
          class="p-1 group focus:outline-none transition-transform hover:scale-110"
          :aria-label="'Go to stage ' + (idx + 1)"
        >
          <div
            class="h-2 rounded-full transition-all duration-300"
            :class="
              idx === currentStageIndex
                ? 'bg-accent w-4'
                : idx < currentStageIndex
                  ? 'bg-accent/50 w-2 group-hover:bg-accent/70'
                  : 'bg-border w-2 group-hover:bg-border/70'
            "
          ></div>
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="flex-1 p-6 overflow-hidden relative bg-surface-primary">
      <!-- All stages use unified list-based rendering for smooth morphing -->
      <div class="h-full flex flex-col justify-center">
        <!-- Stages 1-4: Unified List View (prompt morphs into intents) -->
        <ul
          v-if="
            currentStage === 'prompt' ||
            currentStage === 'intents' ||
            currentStage === 'operations' ||
            currentStage === 'plan'
          "
          ref="parent"
          class="space-y-2 max-w-lg mx-auto w-full"
        >
          <li
            v-for="item in currentStage === 'prompt'
              ? PROMPT_ITEM
              : currentStage === 'intents'
                ? INTENTS
                : currentStage === 'operations'
                  ? OPERATIONS
                  : visiblePlanSteps"
            :key="item.id"
            class="p-3 rounded border border-border bg-surface-secondary/30 text-text-primary transition-all duration-300 hover:border-accent/40"
            :class="currentStage === 'prompt' ? 'p-6 text-center' : ''"
          >
            <div
              class="flex gap-3"
              :class="
                currentStage === 'prompt' ? 'flex-col items-center text-center' : 'items-center'
              "
            >
              <!-- Icon for prompt -->
              <div
                v-if="currentStage === 'prompt'"
                class="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <!-- Status indicator for other stages -->
              <div
                v-else
                class="w-2 h-2 rounded-full transition-colors duration-300 flex-shrink-0"
                :class="
                  currentStage === 'plan'
                    ? item.status === 'complete'
                      ? 'bg-green-500'
                      : 'bg-accent animate-pulse'
                    : 'bg-accent'
                "
              ></div>
              <span
                class="font-mono"
                :class="currentStage === 'prompt' ? 'text-lg font-medium' : 'text-sm'"
                >{{ item.label }}</span
              >
            </div>
            <!-- Response for plan steps -->
            <div
              v-if="currentStage === 'plan' && item.response && item.status === 'complete'"
              class="mt-2 pl-5 text-xs text-green-600 dark:text-green-400 font-mono"
            >
              {{ item.response }}
            </div>
          </li>
        </ul>
        <div v-else-if="currentStage === 'result'" class="h-full flex flex-col items-center">
          <div class="overflow-x-auto border border-border rounded-lg max-w-lg w-full">
            <table class="w-full text-sm text-left">
              <thead
                class="bg-surface-secondary/50 text-text-secondary font-medium border-b border-border"
              >
                <tr>
                  <th class="px-4 py-3">Playlist</th>
                  <th class="px-4 py-3">Track</th>
                  <th class="px-4 py-3">Artist</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr
                  v-for="(row, idx) in RESULT_DATA"
                  :key="idx"
                  class="hover:bg-surface-secondary/20 transition-colors"
                >
                  <td class="px-4 py-3 text-text-primary font-medium">{{ row.playlist }}</td>
                  <td class="px-4 py-3 text-text-secondary">{{ row.track }}</td>
                  <td class="px-4 py-3 text-text-secondary">{{ row.artist }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Stage 6: Read More -->
        <div
          v-else-if="currentStage === 'readmore'"
          class="h-full flex flex-col items-center text-center"
        >
          <div class="max-w-lg w-full space-y-6">
            <div
              class="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <div class="space-y-3">
              <p class="text-lg text-text-primary font-medium">Want to learn how this works?</p>
              <p class="text-sm text-text-secondary">
                Dive into the technical approach behind Agent Scalar
              </p>
            </div>
            <button
              @click="scrollToEarlyApproach"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Read the full breakdown
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
