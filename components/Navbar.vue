<template>
  <nav class="fixed z-50 w-full py-3 shadow-md bg-dark-500 soft-switch" style="z-index: 999">
    <div class="flex justify-between max-w-screen-lg px-4 mx-auto">
      <nuxt-link aria-label="home" to="/">
        <logo white class="h-20" />
      </nuxt-link>

      <button
        @click="switchMode()"
        aria-label="Switch to dark/light mode"
        title="Switch to dark/light mode"
        class="px-2 focus:outline-none"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-8 h-8 text-white light-bulb"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Navbar extends Vue {
  switchMode() {
    this.$store.commit("TOGGLE_MODE");
  }
}
</script>
