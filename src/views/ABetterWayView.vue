<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProseBlock from '@/components/ui/ProseBlock.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import InfoCard from '@/components/ui/InfoCard.vue'
import StepsFlow from '@/components/ui/StepsFlow.vue'
import DataTable from '@/components/ui/DataTable.vue'
import MetricCard from '@/components/ui/MetricCard.vue'
import ArchitectureFlow from '@/components/diagrams/ArchitectureFlow.vue'
import ConvergenceDiagram from '@/components/diagrams/ConvergenceDiagram.vue'
import DecisionNode from '@/components/diagrams/DecisionNode.vue'
import MediaItem from '@/components/ui/MediaItem.vue'
import SocialButton from '@/components/ui/SocialButton.vue'
import IconGitHub from '@/components/icons/IconGitHub.vue'
import { getCloudinaryUrl } from '@/helpers/cloudinary'

const sections = [
  { id: 'stop-sign', label: 'Stop Sign Detection' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'street-view', label: 'Street View Processing' },
  { id: 'yolo', label: 'YOLO Detection' },
  { id: 'deployment', label: 'Deployment' },
  { id: 'traffic', label: 'Traffic Avoidance' },
  { id: 'jam-factor', label: 'Jam Factor' },
  { id: 'algorithm', label: 'The Algorithm' },
  { id: 'next-steps', label: 'Next Steps' },
  { id: 'summary', label: 'Summary' },
]

const architectureBoxes = [
  {
    id: 'frontend',
    title: 'Vue.js Frontend',
    subtitle: 'Route Analysis',
    icon: '🖥️',
    items: ['Requests detection at each intersection', 'POST /detect with coordinates'],
  },
  {
    id: 'api',
    title: 'Stop Sign Detector API',
    subtitle: 'FastAPI Service',
    icon: '⚡',
    items: [
      'Receive coordinates + heading',
      'Download Street View tiles',
      'Stitch into directional view',
      'Run YOLO detection',
    ],
  },
]

const panoSteps = [
  {
    number: 1,
    title: 'Map Angular Positions',
    description: 'Calculate the angular position for each tile column in the 360° panorama.',
  },
  {
    number: 2,
    title: 'Select Heading Columns',
    description: 'Pick ~20% of columns centered on your travel direction.',
  },
  {
    number: 3,
    title: 'Fetch Tiles',
    description: 'Download selected tiles asynchronously from Street View API.',
  },
  {
    number: 4,
    title: 'Stitch & Crop',
    description: 'Combine tiles into a square image facing your heading.',
  },
]

const zoomLevels = {
  headers: ['Zoom', 'Columns', 'Rows', 'Resolution'],
  rows: [
    ['3', '8', '4', 'Lower'],
    ['4', '16', '8', '<strong class="text-accent">We use this</strong>'],
    ['5', '32', '16', 'Higher'],
  ],
}

const jamFactorTable = {
  headers: ['Jam Factor', 'Meaning', 'Action'],
  rows: [
    ['0-2', 'Free flow', '✅ No avoidance'],
    ['3-4', 'Light traffic', '✅ Usually fine'],
    ['5-6', 'Moderate congestion', '⚠️ Consider avoiding'],
    ['7-8', 'Heavy congestion', '🔴 Avoid'],
    ['9-10', 'Standstill', '🔴 Definitely avoid'],
  ],
}

const confidenceTable = {
  headers: ['Confidence', 'Source', 'Reliability'],
  rows: [
    ['> 0.7', 'Real-time probes', '🟢 Live traffic'],
    ['0.5-0.7', 'Historical patterns', '🟡 Typical for time'],
    ['< 0.5', 'Speed limits', '🔴 Fallback only'],
  ],
}

const summaryTable = {
  headers: ['Component', 'Purpose', 'Technology'],
  rows: [
    ['Traffic Flow', 'Real-time congestion data', 'HERE Traffic Flow API'],
    ['Stop Signs', 'Visual intersection analysis', 'Custom YOLO + Street View'],
    ['Routing', 'Generate alternatives', 'HERE Routing API'],
    ['Scoring', 'Compare route quality', 'Local processing'],
  ],
}

const algorithmBranches = [
  { title: 'Calculate Routes', icon: '🗺️' },
  { title: 'Find Traffic', icon: '🚗' },
  { title: 'Find Stop Signs', icon: '🛑' },
]

const nextSteps = [
  {
    title: 'Turn-by-Turn Navigation',
    description: 'Active routing guidance that keeps "The Better Way" alive after you click Go.',
    icon: '📍',
  },
  {
    title: 'Continuous Traffic Tracking',
    description: 'Real-time monitoring to spot jams forming ahead and reroute before you hit them.',
    icon: '🛰️',
  },
  {
    title: 'Submit a Better Way',
    description:
      'Capture local expertise by allowing users to submit their own secret shortcuts and "better ways".',
    icon: '🚀',
  },
  {
    title: 'Smart Caching',
    description: "Remembering stop sign locations so we don't need to re-scan known intersections.",
    icon: '🧠',
  },
  {
    title: 'User Profiles',
    description: 'Save your favorite routes, driving preferences, and custom avoidance zones.',
    icon: '👤',
  },
  {
    title: 'Adaptive Rerouting',
    description: 'Intelligent path adjustments that preserve the "better way" if we must divert.',
    icon: '🔀',
  },
  {
    title: 'Intersection Ranking',
    description:
      'Not all left turns are equal. We will grade them by difficulty, location, and historical traffic.',
    icon: '📊',
  },
  {
    title: 'No Backtracking',
    description:
      'Smarter graph sorting to ensure we never suggest a route that feels like a mistake.',
    icon: '⬆️',
  },
]

const pythonPanoCode = `def get_pano_at_heading(lat, lon, heading, zoom=4, coverage=0.2):
    pano = streetview.find_panorama(lat, lon)

    # Map columns to angles, select those facing our heading
    column_angles = map_columns_to_angles(total_cols, pano.heading)
    selected_cols = select_columns(column_angles, heading, coverage)
    selected_rows = select_middle_rows(total_rows, len(selected_cols))

    # Fetch all tiles in parallel
    return download_tiles(pano.id, selected_cols, selected_rows, zoom)`

const pythonDetectionCode = `model = YOLO("model/best.pt")
results = model.predict(temp_path, conf=request.conf, verbose=False)

# Check for stop sign (class 0)
has_stop_sign = False
for result in results:
    for box in result.boxes:
        if int(box.cls) == 0:  # Stop sign class
            has_stop_sign = True
            break`

const dockerCode = `FROM python:3.12-slim

# System deps for OpenCV/Pillow
RUN apt-get update && apt-get install -y \\
    libgl1 libglib2.0-0 libsm6 libxext6 libxrender1 gcc

# Python deps + model
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY main.py api.py model/ ./

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]`

const iterationCode = `while (iteration < MAX_ITERATIONS) {
  // 1. Analyze current routes
  const [traffic, stopSigns] = await Promise.all([
    findTrafficAvoidance(routes, jamThreshold),
    findStopSigns(routes),
  ])

  // 2. Add to avoid zones
  addTrafficSegments(traffic)
  addStopSignBoxes(stopSigns)

  // 3. Calculate new routes avoiding everything
  const improved = await calculateBetterRoute(start, end, avoidZones)

  // 4. Check ETA budget
  if (newEta > targetEta) break

  routes = improved
}`
</script>

<template>
  <PageLayout :sections="sections">
    <PageHeader title="A Better Way" subtitle="A maps app that prioritizes enjoyment over speed." />

    <!-- Hero intro -->
    <ProseBlock>
      <p class="text-lg">
        The idea behind "A Better Way" is simple: stop making me sit at bad intersections. Traffic
        is one thing, but those unprotected left turns at stop signs? The ones where you're just
        waiting forever for a gap? Yeah, those kill the vibe. So I built something that spots them.
      </p>
      <p class="text-text-dim italic">
        How do you know if an intersection has a stop sign? You look at it.
      </p>
    </ProseBlock>

    <!-- Stop Sign Detection Section -->
    <section id="stop-sign" class="scroll-mt-20 space-y-8">
      <SectionHeader title="Stop Sign Detection" />

      <div class="grid gap-4 md:grid-cols-3">
        <InfoCard title="The Problem" icon="❓">
          Navigation APIs tell you where to turn, but not <em>what kind of turn</em> it is.
        </InfoCard>
        <InfoCard title="The Gap" icon="🗺️">
          Google Maps knows road layout. It doesn't know you'll wait 3 minutes for a gap.
        </InfoCard>
        <InfoCard title="Our Solution" icon="👁️">
          We built a system that <strong>sees</strong> intersections using Street View imagery.
        </InfoCard>
      </div>
    </section>

    <!-- Architecture Section -->
    <section id="architecture" class="scroll-mt-20 space-y-8">
      <SectionHeader title="Architecture Overview" />
      <ArchitectureFlow :boxes="architectureBoxes" layout="vertical" />
    </section>

    <!-- Street View Processing -->
    <section id="street-view" class="scroll-mt-20 space-y-8">
      <SectionHeader title="Extracting Directional Views" />

      <ProseBlock>
        <p>
          Street View panoramas are 360° images stored as tile grids. We don't need the full
          panorama—just the view in the <strong class="text-accent">direction of travel</strong>.
        </p>
      </ProseBlock>

      <DataTable :headers="zoomLevels.headers" :rows="zoomLevels.rows" :highlight-column="3" />

      <StepsFlow :steps="panoSteps" />

      <CodeBlock language="python" :code="pythonPanoCode" />

      <div
        class="rounded-2xl border border-dashed border-border bg-bg-secondary/30 p-8 text-center"
      >
        <MediaItem
          type="image"
          label="stitched tiles"
          :src="getCloudinaryUrl('stitched_tiles_rin30e', 'image')"
        />
      </div>
    </section>

    <!-- YOLO Detection -->
    <section id="yolo" class="scroll-mt-20 space-y-8">
      <SectionHeader title="YOLO Detection" />

      <ProseBlock>
        <p>
          We use
          <a
            href="https://docs.ultralytics.com/"
            target="_blank"
            class="text-accent hover:underline"
            >Ultralytics YOLO</a
          >
          with a <strong>custom-trained model</strong> specifically for stop sign detection.
        </p>
      </ProseBlock>

      <div class="grid gap-4 md:grid-cols-3">
        <InfoCard title="Why Custom?" icon="🎯" subtitle="Off-the-shelf models aren't enough">
          They're optimized for dashcams, include 80 classes we don't need, and have lower
          confidence on Street View imagery.
        </InfoCard>
        <InfoCard title="Training Data" icon="📊" subtitle="Diverse Street View samples">
          Various distances, angles, lighting conditions, and occlusion levels (trees, cars, etc.)
        </InfoCard>
        <InfoCard title="Result" icon="✅" subtitle="Higher accuracy">
          Fine-tuned model with significantly higher confidence on Street View's unique perspective.
        </InfoCard>
      </div>

      <CodeBlock language="python" :code="pythonDetectionCode" />
    </section>

    <!-- Deployment -->
    <section id="deployment" class="scroll-mt-20 space-y-8">
      <SectionHeader title="Deployment" />

      <ProseBlock>
        <p>The service runs in Docker for consistent deployments across environments.</p>
      </ProseBlock>

      <CodeBlock language="dockerfile" :code="dockerCode" />

      <div class="flex justify-center">
        <div
          class="inline-flex items-center gap-3 rounded-full border border-border bg-bg-secondary px-6 py-3"
        >
          <code class="text-accent">docker compose up --build</code>
          <span class="text-text-dim">→ Running on port 8000</span>
        </div>
      </div>

      <ProseBlock>
        <p>
          Once deployed, the service exposes an endpoint that accepts coordinates and a heading. It
          then performs the full pipeline: fetching tiles, stitching them, and running the
          <strong class="text-accent">YOLO detection model</strong> on the resulting image to
          identify stop signs.
        </p>
      </ProseBlock>

      <MediaItem
        type="image"
        label="stitched tiles"
        :src="getCloudinaryUrl('stitched_tiles_predicted_hqj38d', 'image')"
      />
    </section>

    <!-- Divider -->
    <div class="my-16 flex items-center gap-4">
      <div class="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
      <span class="text-2xl">🚗</span>
      <div class="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
    </div>

    <!-- Traffic Avoidance Section -->
    <section id="traffic" class="scroll-mt-20 space-y-8">
      <SectionHeader title="Traffic Avoidance: Finding the Flow" />

      <ProseBlock>
        <p class="text-lg">
          Stop signs are one piece of the puzzle. The other big one?
          <strong class="text-accent">Traffic.</strong>
        </p>
        <p>
          I pull real-time data to find congested segments and steer you around them. The goal is to
          keep you on roads that are actually moving.
        </p>
      </ProseBlock>

      <div class="grid gap-4 md:grid-cols-2">
        <InfoCard title="HERE Traffic Flow API" icon="📡" subtitle="Real-time traffic data">
          Query traffic conditions across an entire bounding box in one API call, covering all
          candidate routes.
        </InfoCard>
        <InfoCard title="Smart Caching" icon="💾" subtitle="Minimize redundant requests">
          Cache the bounding box coverage and only refetch when routes extend beyond it.
        </InfoCard>
      </div>
    </section>

    <!-- Jam Factor -->
    <section id="jam-factor" class="scroll-mt-20 space-y-8">
      <SectionHeader title="Jam Factor: The Key Metric" />

      <ProseBlock>
        <p>
          The <code class="rounded bg-bg-tertiary px-2 py-1 text-accent">jamFactor</code> is a 0-10
          scale indicating congestion severity. Users can adjust the threshold to control how
          aggressive avoidance is.
        </p>
      </ProseBlock>

      <DataTable
        :headers="jamFactorTable.headers"
        :rows="jamFactorTable.rows"
        :highlight-column="2"
      />

      <SectionHeader title="Data Source Confidence" />
      <DataTable
        :headers="confidenceTable.headers"
        :rows="confidenceTable.rows"
        :highlight-column="2"
      />
    </section>

    <!-- Algorithm Section -->
    <section id="algorithm" class="scroll-mt-20 space-y-8">
      <SectionHeader title="The Better Way Algorithm" />

      <ProseBlock>
        <p>Here's how everything comes together in the iterative routing loop:</p>
      </ProseBlock>

      <ConvergenceDiagram :branches="algorithmBranches" center-title="Add to Avoid Zones" />

      <DecisionNode
        question="ETA within margin?"
        yes-result="Continue iterating (max 5x)"
        no-result="Stop: Use best route"
      />

      <CodeBlock language="typescript" :code="iterationCode" />

      <div class="grid gap-4 md:grid-cols-3">
        <MetricCard value="5" label="Max Iterations" color="accent" />
        <MetricCard value="15s" label="Stop Sign Delay" color="warning" />
        <MetricCard value="+15min" label="ETA Margin Example" color="success" />
      </div>
    </section>

    <section id="next-steps" class="scroll-mt-20 space-y-8">
      <SectionHeader title="Next Steps" subtitle="The roadmap to a better driving experience." />

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <InfoCard v-for="step in nextSteps" :key="step.title" :title="step.title" :icon="step.icon">
          {{ step.description }}
        </InfoCard>
      </div>
    </section>

    <!-- Summary -->
    <section id="summary" class="scroll-mt-20 space-y-8">
      <SectionHeader title="Summary: The Full Picture" />

      <DataTable :headers="summaryTable.headers" :rows="summaryTable.rows" />

      <div
        class="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-8 text-center"
      >
        <p class="text-xl font-semibold text-text-primary">
          Routes that might take a bit longer, but keep you
          <strong class="text-accent">moving</strong> instead of sitting in traffic.
        </p>
      </div>

      <div
        class="rounded-2xl border border-dashed border-border bg-bg-secondary/30 p-8 text-center"
      >
        <MediaItem
          type="image"
          label="Traffic Avoidance"
          :src="getCloudinaryUrl('route-visualization', 'image')"
        />
      </div>

      <div class="flex flex-wrap justify-center gap-3">
        <span
          class="rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm text-text-secondary"
          >Vue.js + TypeScript</span
        >
        <span
          class="rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm text-text-secondary"
          >FastAPI (Python)</span
        >
        <span
          class="rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm text-text-secondary"
          >YOLO v8</span
        >
        <span
          class="rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm text-text-secondary"
          >Google Street View</span
        >
        <span
          class="rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm text-text-secondary"
          >HERE APIs</span
        >
        <span
          class="rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm text-text-secondary"
          >Docker</span
        >
      </div>

      <div class="flex justify-center mt-12">
        <SocialButton
          name="Follow Updates on GitHub"
          url="https://github.com/Mason-Little/a-better-way"
        >
          <template #icon>
            <IconGitHub class="w-6 h-6" />
          </template>
        </SocialButton>
      </div>
    </section>
  </PageLayout>
</template>
