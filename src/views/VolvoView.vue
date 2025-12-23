<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProseBlock from '@/components/ui/ProseBlock.vue'
import MediaItem from '@/components/ui/MediaItem.vue'

// Assets are hosted on jsDelivr to avoid bloating the build
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/Mason-Little/who-am-I@main/media/volvo'

const specs = {
  engine: ['5.3L LS V8', 'Twin Turbo Setup', 'Custom Intake Manifold', 'Standalone ECU'],
  transmission: ['T56 6-Speed Manual', 'Custom Driveshaft', 'Upgraded Clutch'],
  suspension: ['Coilover Conversion', 'Adjustable Control Arms', 'Upgraded Sway Bars'],
  exterior: ['Custom Widebody', 'Period-Correct Wheels', 'Complete Respray'],
}

const sections = [
  { id: 'story', label: 'The Story' },
  { id: 'specs', label: 'Build Specs' },
]
</script>

<template>
  <PageLayout :sections="sections">
    <PageHeader
      title="1992 Volvo 240 LS Swap"
      subtitle="From Swedish brick to twin-turbo monster."
    />

    <section id="story" class="space-y-8 scroll-mt-20">
      <SectionHeader title="The Journey" />

      <!-- Chapter 1: The Beginning -->
      <ProseBlock>
        <p>
          I first bought this Volvo 240 when I was 15. I watched the
          <a
            href="https://www.youtube.com/watch?v=FWqkDufkqbU"
            target="_blank"
            class="text-accent hover:underline"
            >Donut Media video</a
          >
          and something clicked. I fell in love with the boxy build of the car and its cool look
          without being too flashy. Shortly after, I ripped the lights out without a care in the
          world.
        </p>
      </ProseBlock>
      <MediaItem type="image" label="Ripping out lights" :src="`${CDN_BASE}/lights-out.jpg`" />

      <!-- Chapter 2: Learning Curve -->
      <ProseBlock>
        <p>
          I've learnt a lot since then. I didn't have my license so I just drove it around a parking
          lot 🤫. About a year later of it just sitting, I bought an aluminum LS...
        </p>
      </ProseBlock>
      <MediaItem type="image" label="Aluminum LS Engine" :src="`${CDN_BASE}/aluminum-engine.jpg`" />

      <!-- Chapter 3: Tear Down -->
      <ProseBlock>
        <p>
          ...and so the build started. After that, I ripped out my old engine in around a day. I was
          thinking "this is going to be so easy" (spoiler: it took another 3 years).
        </p>
      </ProseBlock>
      <MediaItem type="image" label="Engine Bay Empty" :src="`${CDN_BASE}/engine-out.jpg`" />

      <!-- Chapter 4: Rebuild -->
      <ProseBlock>
        <p>Then started the rebuild. Took everything apart on the engine and rebuilt it new.</p>
      </ProseBlock>
      <MediaItem
        type="image"
        label="Engine Rebuild Process"
        :src="`${CDN_BASE}/engine-rebuild.jpg`"
      />

      <!-- Chapter 5: Assembly -->
      <ProseBlock>
        <p>Lots of parts later, the engine was in the car.</p>
      </ProseBlock>
      <MediaItem type="image" label="Engine Installing" :src="`${CDN_BASE}/in-the-car.jpg`" />

      <!-- Chapter 6: First Start -->
      <ProseBlock>
        <p>
          From there we sound deadened the car and it was finally running. Mind you, the exhaust was
          coming out the front fenders. After that we thought we should probably build an exhaust.
        </p>
      </ProseBlock>
      <MediaItem type="image" label="Fender Exit Exhaust" :src="`${CDN_BASE}/exhuast.jpg`" />

      <!-- Chapter 7: Upgrades -->
      <ProseBlock>
        <p>...suspension...</p>
      </ProseBlock>
      <MediaItem type="image" label="Suspension Upgrade" :src="`${CDN_BASE}/suspension.jpg`" />

      <ProseBlock>
        <p>
          Little did I know this would be one of many exhausts. Now comes the steez. I bought new
          wheels...
        </p>
      </ProseBlock>

      <MediaItem type="image" label="New Wheels" :src="`${CDN_BASE}/wheels.jpg`" />

      <ProseBlock>
        <p>...and wrap.</p>
      </ProseBlock>
      <MediaItem type="image" label="Car Wrapped" :src="`${CDN_BASE}/wrap.jpg`" />

      <!-- Chapter 8: Interior -->
      <ProseBlock>
        <p>
          This was just the start. After driving that for about a year, I found some salvage 2011
          C63 seats.
        </p>
      </ProseBlock>
      <MediaItem type="image" label="C63 Seats" :src="`${CDN_BASE}/seats.jpg`" />

      <ProseBlock>
        <p>
          I figured out all the electronics for the complicated Mercedes CanBus electronics, and
          everything worked! I drove it for a while like this.
        </p>
      </ProseBlock>

      <!-- Chapter 9: Turbo -->
      <ProseBlock>
        <p>
          But like any developer or car guy knows, it wasn't enough. I ripped everything out and
          welded a custom twin turbo kit for my car...
        </p>
      </ProseBlock>
      <MediaItem type="image" label="Custom Twin Turbo Kit" :src="`${CDN_BASE}/turbos.jpg`" />
      <MediaItem type="image" label="Custom Twin Turbo Kit" :src="`${CDN_BASE}/turbos-top.jpg`" />

      <ProseBlock>
        <p>...and finally I was able to dyno it...</p>
      </ProseBlock>
      <MediaItem type="video" label="Dyno Run Video" :src="`${CDN_BASE}/dyno.mp4`" />

      <ProseBlock>
        <p>
          ...and enjoy it. This build was interesting because I started knowing nothing and ended
          being able to confidently understand what everything does on not only my car but all other
          cars. I can now confidently say there is not a single bolt I have not touched (I'm
          serious).
        </p>
      </ProseBlock>
    </section>

    <!-- Build Specs Section -->
    <section id="specs" class="space-y-8 scroll-mt-20">
      <SectionHeader title="The Build List" />
      <ProseBlock>
        <p>Check out the full build list if you don't believe me:</p>
      </ProseBlock>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(items, category) in specs"
          :key="category"
          class="bg-surface-secondary/30 rounded-lg p-6 border border-border hover:border-accent/50 transition-colors group"
        >
          <h3
            class="text-lg font-medium text-text-primary mb-4 capitalize group-hover:text-accent transition-colors"
          >
            {{ category }}
          </h3>
          <ul class="space-y-2">
            <li
              v-for="item in items"
              :key="item"
              class="text-text-secondary flex items-center gap-2"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </PageLayout>
</template>
