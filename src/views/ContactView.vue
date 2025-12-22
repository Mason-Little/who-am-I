<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import ContactItem from '@/components/ui/ContactItem.vue'
import SocialButton from '@/components/ui/SocialButton.vue'

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
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </template>
            </ContactItem>

            <!-- Phone -->
            <ContactItem
              label="Phone"
              :value="contactInfo.phone"
              :href="`tel:${contactInfo.phone}`"
            >
              <template #icon>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                  />
                </svg>
              </template>
            </ContactItem>

            <!-- Location -->
            <ContactItem label="Location" :value="contactInfo.location">
              <template #icon>
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
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
              <svg
                v-if="social.icon === 'github'"
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
              <!-- LinkedIn Icon -->
              <svg
                v-if="social.icon === 'linkedin'"
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
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
