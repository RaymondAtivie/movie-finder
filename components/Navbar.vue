<template>
  <nav class="fixed z-50 w-full py-3 shadow-md bg-dark-500 soft-switch" style="z-index: 999">
    <div class="flex items-center justify-between max-w-screen-lg px-4 mx-auto">
      <nuxt-link aria-label="home" to="/">
        <logo class="h-20" />
      </nuxt-link>

      <div>
        <button
          @click="switchMode()"
          :aria-label="`Switch to ${modeInverse} mode`"
          :title="`Switch to ${modeInverse} mode`"
          class="flex flex-col items-center px-2 soft-switch focus:outline-none"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-8 h-8 text-white soft-switch light-bulb"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <!-- <span class="text-sm text-white">Switch to</span> -->
          <span v-if="mode == 'dark'" class="text-sm text-white soft-switch">Light mode</span>
          <span v-else-if="mode == 'light'" class="text-sm text-white soft-switch">Dark mode</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Navbar extends Vue {
  get mode() {
    return this.$store.getters['mode']
  }

  get modeInverse() {
    if (this.mode == 'light') return 'dark'

    return 'light'
  }

  switchMode() {
    this.$store.commit('TOGGLE_MODE')
  }
}
</script>
