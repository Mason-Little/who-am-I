<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ProseBlock from '@/components/ui/ProseBlock.vue'
import MediaItem from '@/components/ui/MediaItem.vue'
import { getCloudinaryUrl } from '@/helpers/cloudinary'

const specs = {
  engine: [
    '5.3L LS V8',
    'Custom Fabricated Twin Turbo Setup',
    'Holley Everything',
    'Holley Standalone ECU',
  ],
  transmission: ['TKX 5-Speed Manual', 'Custom Driveshaft', 'Upgraded Clutch'],
  suspension: [
    'Coilover Conversion',
    'Adjustable Control Arms',
    'Upgraded Sway Bars',
    'Wilwood Brakes',
    'Forged Rear Axles',
    'Limited Slip Differential',
  ],
  exterior: ['Forest Green Wrap', 'Period-Correct Wheels', 'Sleeper'],
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
      <MediaItem
        type="image"
        label="Ripping out lights"
        :src="getCloudinaryUrl('lights-out_hpdbuh', 'image')"
      />

      <!-- Chapter 2: Learning Curve -->
      <ProseBlock>
        <p>
          I've learnt a lot since then. I didn't have my license so I just drove it around a parking
          lot 🤫. About a year later of it just sitting, I bought an aluminum LS...
        </p>
      </ProseBlock>
      <MediaItem
        type="image"
        label="Aluminum LS Engine"
        :src="getCloudinaryUrl('aluminum-engine_pyarcb', 'image')"
      />

      <!-- Chapter 3: Tear Down -->
      <ProseBlock>
        <p>
          ...and so the build started. After that, I ripped out my old engine in around a day. I was
          thinking "this is going to be so easy" (spoiler: it took another 3 years).
        </p>
      </ProseBlock>
      <MediaItem
        type="image"
        label="Engine Bay Empty"
        :src="getCloudinaryUrl('engine-out_baiegp', 'image')"
      />

      <!-- Chapter 4: Rebuild -->
      <ProseBlock>
        <p>Then started the rebuild. Took everything apart on the engine and rebuilt it new.</p>
      </ProseBlock>
      <MediaItem
        type="image"
        label="Engine Rebuild Process"
        :src="getCloudinaryUrl('engine-rebuild_z8jra3', 'image')"
      />

      <!-- Chapter 5: Assembly -->
      <ProseBlock>
        <p>Lots of parts later, the engine was in the car.</p>
      </ProseBlock>
      <MediaItem
        type="image"
        label="Engine Installing"
        :src="getCloudinaryUrl('in-the-car_gj6t8e')"
      />

      <!-- Chapter 6: First Start -->
      <ProseBlock>
        <p>
          From there we sound deadened the car and it was finally running. Mind you, the exhaust was
          coming out the front fenders. After that we thought we should probably build an exhaust.
        </p>
      </ProseBlock>
      <MediaItem
        type="image"
        label="Fender Exit Exhaust"
        :src="getCloudinaryUrl('exhuast_n2kqem')"
      />

      <!-- Chapter 7: Upgrades -->
      <ProseBlock>
        <p>...suspension...</p>
      </ProseBlock>
      <MediaItem
        type="image"
        label="Suspension Upgrade"
        :src="getCloudinaryUrl('suspension_sofirt')"
      />

      <ProseBlock>
        <p>
          Little did I know this would be one of many exhausts. Now comes the steez. I bought new
          wheels...
        </p>
      </ProseBlock>

      <MediaItem type="image" label="New Wheels" :src="getCloudinaryUrl('wheels_anf76k')" />

      <ProseBlock>
        <p>...and wrap.</p>
      </ProseBlock>
      <MediaItem type="image" label="Car Wrapped" :src="getCloudinaryUrl('wrap-min_qcgwg4')" />

      <!-- Chapter 8: Interior -->
      <ProseBlock>
        <p>
          This was just the start. After driving that for about a year, I found some salvage 2011
          C63 seats.
        </p>
      </ProseBlock>
      <MediaItem type="image" label="C63 Seats" :src="getCloudinaryUrl('seats_psjpcu')" />

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
      <MediaItem
        type="image"
        label="Custom Twin Turbo Kit"
        :src="getCloudinaryUrl('turbos_jlf3ez')"
      />
      <MediaItem
        type="image"
        label="Custom Twin Turbo Kit"
        :src="getCloudinaryUrl('turbos-top_fsgfzp')"
      />

      <ProseBlock>
        <p>...and finally I was able to dyno it...</p>
      </ProseBlock>
      <MediaItem
        type="video"
        label="Dyno Run Video"
        :src="getCloudinaryUrl('dyno_xjtova', 'video')"
      />

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
