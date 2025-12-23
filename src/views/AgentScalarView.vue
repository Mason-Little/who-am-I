<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProseBlock from '@/components/ui/ProseBlock.vue'
import MediaItem from '@/components/ui/MediaItem.vue'
import { getCloudinaryUrl } from '@/helpers/cloudinary'

const sections = [
  { id: 'vision', label: 'The Vision' },
  { id: 'foundation', label: 'Foundation Problems' },
  { id: 'upload', label: 'Upload Phase' },
  { id: 'query', label: 'Query Phase' },
  { id: 'execution', label: 'Execution Phase' },
  { id: 'recovery', label: 'Error Recovery' },
  { id: 'flow', label: 'Full Flow' },
  { id: 'learnings', label: 'What We Learned' },
]
</script>

<template>
  <PageLayout :sections="sections">
    <PageHeader
      title="How We Built Agent Scalar"
      subtitle="Teaching AI to Actually Do Things With APIs"
    />

    <MediaItem
      type="video"
      label="Agent Scalar Demo"
      :src="getCloudinaryUrl('Screen_Recording_2025-09-29_at_10.34.14_PM_u76mhc', 'video')"
      class="mb-12"
    />

    <!-- The Vision -->
    <section id="vision" class="space-y-6 scroll-mt-20">
      <SectionHeader title="The Vision" />
      <ProseBlock>
        <p>It started with a pretty simple question from Marc in 2024:</p>
        <blockquote class="border-l-4 border-accent pl-4 italic text-text-secondary my-4">
          "What if you could just chat with an API?"
        </blockquote>
        <p>
          Type something like <em>"get all my songs in the dance playlist"</em> and watch it happen.
          No documentation. No curl commands. Just conversation.
        </p>
        <p class="text-text-secondary">
          We learned very quickly that this was anything but simple.
        </p>
      </ProseBlock>
    </section>

    <!-- Foundation Problems -->
    <section id="foundation" class="space-y-8 scroll-mt-20">
      <SectionHeader title="Part 1: The Foundation Problems" />

      <!-- Single-Agent Trap -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">The Single-Agent Trap</h3>
        <ProseBlock>
          <p>
            Our first approach was the obvious one: give a single LLM the OpenAPI spec and let it
            handle everything.
          </p>
          <p>For basic queries, this actually worked fine.</p>
          <p>
            But we didn't want Agent Scalar to just answer questions. We wanted it to
            <strong>do things</strong>:
          </p>
          <ul class="list-disc list-inside space-y-2 text-text-secondary">
            <li>build multi-step workflows</li>
            <li>execute chained API requests</li>
            <li>generate tables</li>
            <li>create charts and visualizations</li>
          </ul>
          <p>
            Once you ask a single model to do all of that, things start to fall apart. Context
            windows get bloated, responses hallucinate, and anything involving multiple steps
            becomes unreliable.
          </p>
          <p>
            On top of that, we really didn't want this to turn into just another chatbot or GPT
            wrapper. The whole point was execution.
          </p>
          <p class="text-text-secondary">
            That pushed us away from a single-agent design pretty early.
          </p>
        </ProseBlock>
      </div>

      <!-- The Scaling Problem -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">The Scaling Problem</h3>
        <ProseBlock>
          <p>Even if the single-model approach worked perfectly, it still wouldn't scale.</p>
          <p>
            Shipping a 50KB OpenAPI document on <strong>every request</strong>, for
            <strong>every user</strong>, with APIs that might have hundreds of endpoints? That's a
            nightmare. Token costs explode. Latency gets bad fast.
          </p>
          <p>So we tried the obvious next step: RAG.</p>
          <p>Store the API in embeddings. Retrieve only what's relevant.</p>
          <p class="text-text-secondary">In practice… it didn't work very well.</p>
        </ProseBlock>
      </div>

      <!-- Why RAG Breaks -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">Why RAG Breaks on APIs</h3>
        <ProseBlock>
          <p>
            RAG works great for PDFs and docs because they're written for humans. They have
            sentences, paragraphs, and actual semantic structure.
          </p>
          <p>OpenAPI documents don't.</p>
          <p>They're structured data. Most operations boil down to something like:</p>
        </ProseBlock>

        <div
          class="bg-surface-secondary/50 rounded-lg p-4 font-mono text-sm text-text-secondary border border-border"
        >
          GET /playlists/{playlist_id} — Get playlist
        </div>

        <ProseBlock>
          <p>
            When a user asks <em>"get all my songs in the dance playlist"</em>, the text similarity
            to that is basically zero.
          </p>
          <p>APIs aren't PDFs. Treating them like they are just doesn't work.</p>
          <p class="text-accent font-medium">
            What we needed was a bridge between how humans talk and how APIs are structured.
          </p>
        </ProseBlock>
      </div>
    </section>

    <!-- Upload Phase -->
    <section id="upload" class="space-y-8 scroll-mt-20">
      <SectionHeader title="Part 2: The Upload Phase" />

      <ProseBlock>
        <p>
          A lot of the real work in Agent Scalar happens <strong>before</strong> a user ever sends a
          message.
        </p>
        <p>
          When someone uploads an OpenAPI document, we do a few things up front so the system is
          actually usable later.
        </p>
      </ProseBlock>

      <!-- Step 1 -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">Step 1: Generating Example Questions</h3>
        <ProseBlock>
          <p>We stopped relying on API documentation text for embeddings entirely.</p>
          <p>
            Instead, on upload, we run each operation through a model whose only job is to generate
            example questions a human <em>might</em> ask.
          </p>
          <p>Instead of embedding:</p>
        </ProseBlock>

        <div
          class="bg-surface-secondary/50 rounded-lg p-4 font-mono text-sm text-text-secondary border border-border"
        >
          GET /playlists/{playlist_id} — Get playlist
        </div>

        <ProseBlock>
          <p>We embed things like:</p>
          <ul class="list-disc list-inside space-y-2 text-text-secondary">
            <li>"get all my songs in the dance playlist"</li>
            <li>"show me what's in my workout playlist"</li>
            <li>"list tracks from my favorites"</li>
          </ul>
          <p>Now we're matching user queries against <strong>human language</strong>, not YAML.</p>
          <p>
            This runs once on upload, so the cost is amortized, and retrieval quality goes way up.
          </p>
        </ProseBlock>
      </div>

      <!-- Step 2 -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">Step 2: Building the Dependency Graph</h3>
        <ProseBlock>
          <p>Even with perfect semantic matching, there's still a big problem.</p>
          <p>If a user says:</p>
          <blockquote class="border-l-4 border-accent pl-4 italic text-text-secondary my-4">
            "get all my songs in the dance playlist"
          </blockquote>
          <p>
            The endpoint we find needs a
            <code class="bg-surface-secondary px-2 py-1 rounded text-accent">playlist_id</code>. The
            user doesn't have that, and they shouldn't need to.
          </p>
          <p>So during upload, we also build a dependency map across the API.</p>
          <p>
            For every operation that requires an identifier, we store which other operations can
            discover it. For example:
          </p>
          <ul class="list-disc list-inside space-y-2 text-text-secondary">
            <li>
              <code class="bg-surface-secondary px-2 py-1 rounded">/playlists/{playlist_id}</code>
              depends on <code class="bg-surface-secondary px-2 py-1 rounded">/playlists</code> or
              <code class="bg-surface-secondary px-2 py-1 rounded">/search</code>
            </li>
          </ul>
          <p>
            This lets the system reason about
            <strong>how to get from zero information to a completed task</strong>.
          </p>
          <p class="text-text-secondary">This logic lives entirely in planning — not execution.</p>
        </ProseBlock>
      </div>

      <!-- Step 3 -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">Step 3: Storing Embeddings</h3>
        <ProseBlock>
          <p>
            Each generated example question gets embedded and stored alongside its operation and
            dependency data in PGVector.
          </p>
          <p>All of this happens once, at upload time.</p>
        </ProseBlock>
      </div>
    </section>

    <!-- Query Phase -->
    <section id="query" class="space-y-8 scroll-mt-20">
      <SectionHeader title="Part 3: The Query Phase" />

      <ProseBlock>
        <p>When a user sends a message, it doesn't go straight to search.</p>
        <p>First, it gets cleaned up.</p>
      </ProseBlock>

      <!-- Step 1 -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">Step 1: The Summarize Agent</h3>
        <ProseBlock>
          <p>Human input is messy. Conversations are full of shortcuts.</p>
          <p>Example:</p>
        </ProseBlock>

        <div class="bg-surface-secondary/50 rounded-lg p-4 space-y-2 border border-border">
          <p class="text-text-secondary">
            <span class="text-accent">User:</span> <em>How do I list playlists?</em>
          </p>
          <p class="text-text-secondary">
            <span class="text-text-primary">Agent:</span> <em>lists playlists</em>
          </p>
          <p class="text-text-secondary">
            <span class="text-accent">User:</span> <em>Delete them all</em>
          </p>
        </div>

        <ProseBlock>
          <p>"Delete them all" doesn't match any endpoint. There's no keyword overlap at all.</p>
          <p>So before we hit embeddings, we normalize the query.</p>
          <p>The summarize agent:</p>
          <ul class="list-disc list-inside space-y-2 text-text-secondary">
            <li>strips filler</li>
            <li>resolves pronouns</li>
            <li>pulls context from conversation history</li>
            <li>splits multi-step requests</li>
          </ul>
          <p>So <em>"delete them all"</em> becomes <em>"delete playlist"</em>.</p>
          <p class="font-medium">Only then does it hit search.</p>
        </ProseBlock>
      </div>

      <!-- Step 2 -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">Step 2: Query Chunking</h3>
        <ProseBlock>
          <p>If a request is complex, we break it apart before searching.</p>
          <p>Something like:</p>
          <blockquote class="border-l-4 border-accent pl-4 italic text-text-secondary my-4">
            "Get traffic and then show me a chart and compare it to yesterday"
          </blockquote>
          <p>Turns into multiple focused searches that run independently.</p>
        </ProseBlock>
      </div>

      <!-- Step 3 -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">Step 3: Embedding Search</h3>
        <ProseBlock>
          <p>The normalized query runs against the vector database:</p>
          <ul class="list-disc list-inside space-y-2 text-text-secondary">
            <li>cosine similarity against generated example questions</li>
            <li>a threshold filters out noise</li>
            <li>matching operations come back with their dependency info</li>
          </ul>
          <p>At this point, we know <em>what</em> could satisfy the request.</p>
          <p class="font-medium">Now we need to actually do it.</p>
        </ProseBlock>
      </div>
    </section>

    <!-- Execution Phase -->
    <section id="execution" class="space-y-8 scroll-mt-20">
      <SectionHeader title="Part 4: The Execution Phase" />

      <ProseBlock>
        <p>Execution in Agent Scalar follows one core rule:</p>
        <blockquote class="border-l-4 border-accent pl-4 font-medium text-text-primary my-4">
          Every agent is constrained. Hard.
        </blockquote>
        <p class="text-text-secondary">Nothing gets free-form output.</p>
      </ProseBlock>

      <!-- Planning -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">Planning With the Task Agent</h3>
        <ProseBlock>
          <p>The task agent's job is planning, not execution.</p>
          <p>It takes:</p>
          <ul class="list-disc list-inside space-y-2 text-text-secondary">
            <li>the user's request</li>
            <li>the relevant operations</li>
            <li>conversation history</li>
          </ul>
          <p>And produces an ordered list of <strong>atomic tasks</strong>.</p>
          <p>
            Each task does exactly one thing. If data is missing, the task agent adds a discovery
            step first.
          </p>
          <p class="text-text-secondary">
            No parameters. No guessing. Just "what needs to happen, and in what order."
          </p>
        </ProseBlock>
      </div>

      <!-- Safe Execution -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">Safe Execution With the Request Agent</h3>
        <ProseBlock>
          <p>
            When it's time to execute an API call, we don't give the request agent the full API.
          </p>
          <p>
            We generate a <strong>single-operation OpenAPI document</strong> containing only the
            endpoint it's allowed to call.
          </p>
          <p>From the agent's perspective, that one operation <em>is the entire API</em>.</p>
          <p>
            On top of that, we generate a validation schema directly from the OpenAPI spec. The
            model can only output parameters that actually exist, with the correct types.
          </p>
          <p class="text-accent font-medium">
            This kills a whole class of hallucinations instantly.
          </p>
        </ProseBlock>
      </div>

      <!-- Chaining -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">Chaining Requests at Runtime</h3>
        <ProseBlock>
          <p>If one task depends on another, we wait.</p>
          <p>
            Earlier responses get injected into later tasks at runtime. That's how IDs, timestamps,
            and derived values flow through the system without shared global state.
          </p>
          <p>This allows chains of arbitrary length from a single prompt.</p>
        </ProseBlock>
      </div>

      <!-- Tables & Graphs -->
      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">Tables, Graphs, and Snippets</h3>
        <ProseBlock>
          <p>When raw JSON isn't enough, we hand off to specialized code agents.</p>
          <p>
            Instead of giving them API data, we give them
            <strong>schemas describing the shape of the data</strong>. They know exactly what fields
            exist, but never see actual values.
          </p>
          <p>From that, they generate:</p>
          <ul class="list-disc list-inside space-y-2 text-text-secondary">
            <li>tables</li>
            <li>charts</li>
            <li>custom snippets</li>
          </ul>
          <p class="text-text-secondary">Safely and predictably.</p>
        </ProseBlock>
      </div>
    </section>

    <!-- Error Recovery -->
    <section id="recovery" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Part 5: Error Recovery" />

      <ProseBlock>
        <p>LLMs are probabilistic. APIs fail. Code breaks.</p>
        <p>So we added retries at every layer:</p>
        <ul class="list-disc list-inside space-y-2 text-text-secondary">
          <li>
            <strong class="text-text-primary">retry-request</strong> — fixes bad parameters or auth
            issues
          </li>
          <li><strong class="text-text-primary">retry-task</strong> — fixes bad plans</li>
          <li><strong class="text-text-primary">retry-code</strong> — fixes runtime errors</li>
        </ul>
        <p>
          Each retry sees full failure history and only changes what's broken. No loops. No starting
          over.
        </p>
      </ProseBlock>
    </section>

    <!-- Full Flow -->
    <section id="flow" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Part 6: The Full Flow" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Upload -->
        <div
          class="bg-surface-secondary/30 rounded-lg p-6 border border-border hover:border-accent/50 transition-colors group"
        >
          <h3
            class="text-lg font-medium text-text-primary mb-4 group-hover:text-accent transition-colors"
          >
            Upload
          </h3>
          <ul class="space-y-2">
            <li class="text-text-secondary flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              generate example questions
            </li>
            <li class="text-text-secondary flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              build dependency graph
            </li>
            <li class="text-text-secondary flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              store embeddings
            </li>
          </ul>
        </div>

        <!-- Query -->
        <div
          class="bg-surface-secondary/30 rounded-lg p-6 border border-border hover:border-accent/50 transition-colors group"
        >
          <h3
            class="text-lg font-medium text-text-primary mb-4 group-hover:text-accent transition-colors"
          >
            Query
          </h3>
          <ul class="space-y-2">
            <li class="text-text-secondary flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              normalize input
            </li>
            <li class="text-text-secondary flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              chunk if needed
            </li>
            <li class="text-text-secondary flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              search embeddings
            </li>
          </ul>
        </div>

        <!-- Plan -->
        <div
          class="bg-surface-secondary/30 rounded-lg p-6 border border-border hover:border-accent/50 transition-colors group"
        >
          <h3
            class="text-lg font-medium text-text-primary mb-4 group-hover:text-accent transition-colors"
          >
            Plan
          </h3>
          <ul class="space-y-2">
            <li class="text-text-secondary flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              task agent produces atomic steps
            </li>
          </ul>
        </div>

        <!-- Execute -->
        <div
          class="bg-surface-secondary/30 rounded-lg p-6 border border-border hover:border-accent/50 transition-colors group"
        >
          <h3
            class="text-lg font-medium text-text-primary mb-4 group-hover:text-accent transition-colors"
          >
            Execute
          </h3>
          <ul class="space-y-2">
            <li class="text-text-secondary flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              request agent runs single-operation calls
            </li>
            <li class="text-text-secondary flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              dependencies resolve at runtime
            </li>
          </ul>
        </div>

        <!-- Format -->
        <div
          class="bg-surface-secondary/30 rounded-lg p-6 border border-border hover:border-accent/50 transition-colors group"
        >
          <h3
            class="text-lg font-medium text-text-primary mb-4 group-hover:text-accent transition-colors"
          >
            Format
          </h3>
          <ul class="space-y-2">
            <li class="text-text-secondary flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              code agents generate tables or graphs
            </li>
          </ul>
        </div>

        <!-- Recover & Stream -->
        <div
          class="bg-surface-secondary/30 rounded-lg p-6 border border-border hover:border-accent/50 transition-colors group"
        >
          <h3
            class="text-lg font-medium text-text-primary mb-4 group-hover:text-accent transition-colors"
          >
            Recover & Stream
          </h3>
          <ul class="space-y-2">
            <li class="text-text-secondary flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              retries handle failures
            </li>
            <li class="text-text-secondary flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              results return to the user
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- What We Learned -->
    <section id="learnings" class="space-y-6 scroll-mt-20">
      <SectionHeader title="What We Learned" />

      <ProseBlock>
        <p>The magic wasn't a bigger model.</p>
        <p class="font-medium text-text-primary">
          It was constraints, orchestration, and specialization.
        </p>
        <ul class="list-disc list-inside space-y-2 text-text-secondary">
          <li>schemas beat clever prompts</li>
          <li>multiple focused agents beat one generalist</li>
          <li>hiding irrelevant context prevents hallucinations</li>
          <li>dependency-aware planning matters</li>
          <li>retries with memory make probabilistic systems usable</li>
        </ul>
        <p>
          Marc's question — <em>"what if you could just chat with an API?"</em> — ended up having a
          very complicated answer.
        </p>
        <p class="text-accent font-medium">But this is the one we landed on.</p>
      </ProseBlock>
    </section>
  </PageLayout>
</template>
