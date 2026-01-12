<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProseBlock from '@/components/ui/ProseBlock.vue'
import AgentScalarFlow from '@/components/AgentScalarFlow.vue'
import MediaItem from '@/components/ui/MediaItem.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import { getCloudinaryUrl } from '@/helpers/cloudinary'

const sections = [
  { id: 'early-approach', label: 'Early Approach' },
  { id: 'retrieval', label: 'Retrieval Problems' },
  { id: 'example-queries', label: 'Example Queries' },
  { id: 'dependencies', label: 'Dependency Mapping' },
  { id: 'query-handling', label: 'Query Handling' },
  { id: 'planning', label: 'Planning' },
  { id: 'execution', label: 'Execution' },
  { id: 'formatting', label: 'Formatting' },
  { id: 'flow', label: 'Example Flow' },
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

    <div class="mb-12">
      <SectionHeader title="Interactive Flow" class="mb-4" />
      <AgentScalarFlow />
    </div>

    <!-- Early Approach -->
    <section id="early-approach" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Early Approach and Scaling Limits" />
      <ProseBlock>
        <p>
          The first version used a single language model with the full OpenAPI spec passed in as
          context.
        </p>
        <p>For simple requests and smaller OpenAPI specs, this worked.</p>
        <p>
          As soon as users asked multi-step questions or requested formatted output, the model
          struggled.
        </p>
        <p>
          It also had way too much context. Each prompt pulled in the entire OpenAPI document. As
          OpenAPI specs got larger, this wasted tokens on information that did not matter for the
          current request.
        </p>
        <p>
          During testing, the agent felt like another question-and-answer wrapper. Execution was
          meant to be the core feature.
        </p>
        <p class="text-text-secondary">
          This pushed us away from a single-model design and toward a more structured system.
        </p>
      </ProseBlock>
    </section>

    <!-- Retrieval Problems -->
    <section id="retrieval" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Why Retrieval Alone Did Not Work" />
      <ProseBlock>
        <p>
          The assumption was that embedding the OpenAPI document would allow us to retrieve relevant
          operations.
        </p>
        <p>This did not work.</p>
        <p>Embeddings hinge on the idea that words have meaning in a vector space, in English.</p>
      </ProseBlock>

      <CodeBlock language="http" :code="`GET /playlists/{playlist_id}`" />

      <ProseBlock>
        <p>does not have meaning.</p>
        <p>
          Even when we included operation descriptions, which are meant to be short and concise, the
          mapping was still poor. It does not reasonably map to:
        </p>
      </ProseBlock>

      <CodeBlock language="text" :code="`get all my songs in the dance playlist`" />

      <ProseBlock>
        <p>
          This caused similarity scores to cluster too closely together, making it hard to
          confidently select the highest-confidence operation.
        </p>
        <p class="text-text-secondary">
          We still needed retrieval for pricing and scale reasons, but we needed to build our own
          retrieval layer that augmented the OpenAPI document rather than embedding it directly.
        </p>
      </ProseBlock>
    </section>

    <!-- Example Queries -->
    <section id="example-queries" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Generating Example Queries" />
      <ProseBlock>
        <p>Instead of embedding raw API definitions, we generate example user queries.</p>
        <p>
          Using a language model, each operation is converted into multiple prompts that represent
          how a user might ask for it.
        </p>
        <p>For example, an operation like:</p>
      </ProseBlock>

      <CodeBlock language="http" :code="`GET /playlists/{playlist_id}`" />

      <ProseBlock>
        <p>becomes stored queries such as:</p>
      </ProseBlock>

      <CodeBlock
        language="text"
        :code="`get all my songs in the dance playlist
show tracks from my workout playlist
list songs in my favorites`"
      />

      <ProseBlock>
        <p>Only these generated queries are embedded.</p>
        <p>At query time, user input is matched against human language instead of API structure.</p>
        <p class="text-accent font-medium">This significantly improved retrieval accuracy.</p>
      </ProseBlock>
    </section>

    <!-- Dependency Mapping -->
    <section id="dependencies" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Dependency Mapping" />
      <ProseBlock>
        <p>Retrieval alone is not enough.</p>
        <p>
          Many operations require identifiers, and we do not want users to walk step by step through
          an API. We want it to just work no matter what the user asks.
        </p>
        <p>During upload, we analyze the API and build a dependency graph.</p>
        <p>
          If an operation requires a value like
          <code class="bg-surface-secondary px-2 py-1 rounded text-accent">playlist_id</code>, we
          record which other operations can produce it.
        </p>
        <p>Conceptually:</p>
      </ProseBlock>

      <CodeBlock
        language="text"
        :code="`/playlists/{playlist_id}
  depends on
/playlists
/search`"
      />

      <ProseBlock>
        <p class="text-text-secondary">
          This information is used during planning. Execution does not guess missing parameters.
        </p>
      </ProseBlock>
    </section>

    <!-- Query Handling -->
    <section id="query-handling" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Query Handling" />
      <ProseBlock>
        <p>User input is normalized before retrieval.</p>
        <p>A request chain like:</p>
      </ProseBlock>

      <CodeBlock
        language="text"
        :code="`update my playlist name then get top songs for that artist`"
      />

      <ProseBlock>
        <p>would produce poor embedding results if treated as a single query.</p>
        <p>
          To handle this, we run user input through a tiny language model that takes in chat history
          and produces multiple database queries.
        </p>
        <p>
          This allows each step in the request chain to retrieve results independently and with
          higher confidence.
        </p>
        <p>A message like:</p>
      </ProseBlock>

      <CodeBlock language="text" :code="`delete them all`" />

      <ProseBlock>
        <p>is rewritten into:</p>
      </ProseBlock>

      <CodeBlock language="text" :code="`delete playlists`" />

      <ProseBlock>
        <p class="text-text-secondary">
          Complex requests are split into smaller ones before retrieval.
        </p>
      </ProseBlock>
    </section>

    <!-- Planning -->
    <section id="planning" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Planning" />
      <ProseBlock>
        <p>Planning and execution are separate concerns.</p>
        <p>The planning agent produces an ordered list of steps.</p>
        <p>Each step performs exactly one action.</p>
        <p>Example plan:</p>
      </ProseBlock>

      <CodeBlock
        language="json"
        :code="`[
  { &quot;action&quot;: &quot;list_playlists&quot; },
  { &quot;action&quot;: &quot;delete_playlist&quot; }
]`"
      />

      <ProseBlock>
        <p>If required data is missing, a discovery step is inserted.</p>
        <p class="text-text-secondary">No parameters are inferred during planning.</p>
      </ProseBlock>
    </section>

    <!-- Execution -->
    <section id="execution" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Execution Constraints" />
      <ProseBlock>
        <p>Execution agents are heavily restricted.</p>
        <p>They do not receive the full API.</p>
        <p>Each step receives a single-operation OpenAPI document.</p>
        <p>For example:</p>
      </ProseBlock>

      <CodeBlock
        language="yaml"
        :code="`openapi: 3.0.3
info:
  title: Playlist API
  version: 1.0.0

paths:
  /playlists/{playlist_id}:
    delete:
      operationId: deletePlaylist
      summary: Delete a playlist
      description: Deletes a playlist owned by the authenticated user.
      parameters:
        - \$ref: '#/components/parameters/PlaylistId'
      responses:
        '204':
          description: Playlist deleted successfully
        '401':
          \$ref: '#/components/responses/Unauthorized'
        '404':
          \$ref: '#/components/responses/NotFound'

components:
  parameters:
    PlaylistId:
      name: playlist_id
      in: path
      required: true
      description: Unique identifier for the playlist
      schema:
        type: string
        example: gym-playlist-123

  responses:
    Unauthorized:
      description: Authentication failed
      content:
        application/json:
          schema:
            \$ref: '#/components/schemas/Error'

    NotFound:
      description: Playlist not found
      content:
        application/json:
          schema:
            \$ref: '#/components/schemas/Error'

  schemas:
    Error:
      type: object
      required:
        - message
        - code
      properties:
        message:
          type: string
          example: Playlist not found
        code:
          type: string
          example: NOT_FOUND`"
      />

      <ProseBlock>
        <p>Validation schemas are generated directly from this spec.</p>
        <p>Only valid parameters can be produced.</p>
        <p class="text-accent font-medium">This removed most hallucinated requests.</p>
      </ProseBlock>
    </section>

    <!-- Formatting -->
    <section id="formatting" class="space-y-6 scroll-mt-20">
      <SectionHeader title="Formatting Code Outputs" />
      <ProseBlock>
        <p>Formatting is handled by dedicated code agents.</p>
        <p>They do not receive raw API responses.</p>
        <p>Instead, they receive schemas describing the shape of the data.</p>
        <p>For example:</p>
      </ProseBlock>

      <CodeBlock
        language="typescript"
        :code="`interface Playlist {
  id: string
  name: string
  trackCount: number
}`"
      />

      <ProseBlock>
        <p>
          With this information, the agent can generate formatting code with a clear understanding
          of the expected input.
        </p>
        <p class="text-text-secondary">
          Large API responses can be parsed and transformed without passing the full payload to the
          model, reducing token usage and keeping formatting deterministic.
        </p>
      </ProseBlock>
    </section>

    <!-- Example Flow -->
    <section id="flow" class="space-y-8 scroll-mt-20">
      <SectionHeader title="Example Request Flow" />
      <ProseBlock>
        <p>Consider a user request like:</p>
        <blockquote class="border-l-4 border-accent pl-4 italic text-text-secondary my-4">
          "get my gym playlist, add the top Kendrick Lamar song to it, and show all the songs in my
          playlists in a table"
        </blockquote>
        <p>During query handling, this is normalized and split into intents:</p>
        <ul class="list-disc list-inside space-y-2 text-text-secondary">
          <li>get playlists</li>
          <li>get top songs</li>
          <li>get playlist tracks</li>
          <li>Table results</li>
        </ul>
        <p>Using the dependency map, these are expanded into concrete operations:</p>
        <ul class="list-disc list-inside space-y-2 text-text-secondary">
          <li>list playlists</li>
          <li>search artists</li>
        </ul>
        <p>We then pass the expanded intents and the original user prompt to the planning agent.</p>
        <p>The planner produces an ordered sequence of atomic steps:</p>
      </ProseBlock>

      <CodeBlock
        language="json"
        :code="`[
  {
    &quot;action&quot;: &quot;list all playlists&quot;,
    &quot;agent_instruction&quot;: &quot;get all user playlists&quot;
  },
  {
    &quot;action&quot;: &quot;resolve target playlist&quot;,
    &quot;agent_instruction&quot;: &quot;select the gym playlist from context&quot;,
    &quot;context&quot;: &quot;list all playlists&quot;
  },
  {
    &quot;action&quot;: &quot;search artist&quot;,
    &quot;agent_instruction&quot;: &quot;lookup artist ID for Kendrick Lamar&quot;
  },
  {
    &quot;action&quot;: &quot;get top songs&quot;,
    &quot;agent_instruction&quot;: &quot;fetch top songs for artist&quot;,
    &quot;context&quot;: &quot;search artist&quot;
  },
  {
    &quot;action&quot;: &quot;add song to playlist&quot;,
    &quot;agent_instruction&quot;: &quot;add top song to target playlist&quot;,
    &quot;context&quot;: [&quot;get top songs&quot;, &quot;resolve target playlist&quot;]
  },
  {
    &quot;action&quot;: &quot;list playlist tracks&quot;,
    &quot;agent_instruction&quot;: &quot;get all tracks for each playlist&quot;,
    &quot;context&quot;: &quot;list all playlists&quot;
  },
  {
    &quot;action&quot;: &quot;format table&quot;,
    &quot;agent_instruction&quot;: &quot;render playlist tracks as table&quot;,
    &quot;context&quot;: &quot;list playlist tracks&quot;
  }
]`"
      />

      <ProseBlock>
        <p>Each step executes only after its dependencies complete.</p>
        <p>Data flows forward through explicit context passing.</p>
        <p class="text-text-secondary">
          This allows multi-step requests to execute deterministically, even when the original
          prompt is vague or underspecified.
        </p>
      </ProseBlock>

      <div class="space-y-4">
        <h3 class="text-xl font-medium text-text-primary">Result</h3>
        <ProseBlock>
          <p>The final step produces structured output instead of raw JSON.</p>
          <p>Example table:</p>
        </ProseBlock>

        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-border text-sm">
            <thead>
              <tr class="bg-surface-secondary/50">
                <th class="border border-border px-4 py-2 text-left text-text-primary">Playlist</th>
                <th class="border border-border px-4 py-2 text-left text-text-primary">Track</th>
                <th class="border border-border px-4 py-2 text-left text-text-primary">Artist</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-border px-4 py-2 text-text-secondary">Gym</td>
                <td class="border border-border px-4 py-2 text-text-secondary">HUMBLE.</td>
                <td class="border border-border px-4 py-2 text-text-secondary">Kendrick Lamar</td>
              </tr>
              <tr>
                <td class="border border-border px-4 py-2 text-text-secondary">Gym</td>
                <td class="border border-border px-4 py-2 text-text-secondary">DNA.</td>
                <td class="border border-border px-4 py-2 text-text-secondary">Kendrick Lamar</td>
              </tr>
              <tr>
                <td class="border border-border px-4 py-2 text-text-secondary">Gym</td>
                <td class="border border-border px-4 py-2 text-text-secondary">Alright</td>
                <td class="border border-border px-4 py-2 text-text-secondary">Kendrick Lamar</td>
              </tr>
              <tr>
                <td class="border border-border px-4 py-2 text-text-secondary">Chill</td>
                <td class="border border-border px-4 py-2 text-text-secondary">Nights</td>
                <td class="border border-border px-4 py-2 text-text-secondary">Frank Ocean</td>
              </tr>
              <tr>
                <td class="border border-border px-4 py-2 text-text-secondary">Chill</td>
                <td class="border border-border px-4 py-2 text-text-secondary">Ivy</td>
                <td class="border border-border px-4 py-2 text-text-secondary">Frank Ocean</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </PageLayout>
</template>
