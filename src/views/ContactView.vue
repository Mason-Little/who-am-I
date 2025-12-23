<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import ContactItem from '@/components/ui/ContactItem.vue'
import SocialButton from '@/components/ui/SocialButton.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconGitHub from '@/components/icons/IconGitHub.vue'
import IconLinkedIn from '@/components/icons/IconLinkedIn.vue'

const contactInfo = {
  name: 'Mason Little',
  headline: 'Software Engineer',
  email: 'mason.leo.little@gmail.com',
  phone: '604-815-9764',
  location: 'Vancouver',
}

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/Mason-Little',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mason-little-52947a295/',
    icon: 'linkedin',
  },
]
</script>

<template>
  <PageLayout>
    <PageHeader title="Contact" subtitle="Let's connect and build something great together." />

    <div class="max-w-3xl space-y-10 animate-fade-in pb-20">
      <!-- Contact Card -->
      <section class="space-y-6">
        <div
          class="bg-surface-secondary/30 rounded-lg p-8 border border-border hover:border-accent/50 transition-colors"
        >
          <!-- Name & Headline -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-text-primary">{{ contactInfo.name }}</h2>
            <p class="text-text-secondary text-lg">{{ contactInfo.headline }}</p>
          </div>

          <!-- Contact Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Email -->
            <ContactItem
              label="Email"
              :value="contactInfo.email"
              :href="`mailto:${contactInfo.email}`"
            >
              <template #icon>
                <IconMail class="w-5 h-5" />
              </template>
            </ContactItem>

            <!-- Phone -->
            <ContactItem
              label="Phone"
              :value="contactInfo.phone"
              :href="`tel:${contactInfo.phone}`"
            >
              <template #icon>
                <IconPhone class="w-5 h-5" />
              </template>
            </ContactItem>

            <!-- Location -->
            <ContactItem label="Location" :value="contactInfo.location">
              <template #icon>
                <IconMapPin class="w-5 h-5" />
              </template>
            </ContactItem>
          </div>
        </div>
      </section>

      <!-- Socials -->
      <section class="space-y-6">
        <h2 class="text-2xl font-semibold text-text-primary flex items-center gap-2">
          <span class="text-accent">##</span> Find Me Online
        </h2>

        <div class="flex gap-4">
          <SocialButton
            v-for="social in socials"
            :key="social.name"
            :name="social.name"
            :url="social.url"
          >
            <template #icon>
              <!-- GitHub Icon -->
              <IconGitHub v-if="social.icon === 'github'" class="w-6 h-6" />
              <!-- LinkedIn Icon -->
              <IconLinkedIn v-if="social.icon === 'linkedin'" class="w-6 h-6" />
            </template>
          </SocialButton>
        </div>
      </section>
    </div>
  </PageLayout>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
