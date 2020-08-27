<template>
  <div class="flex flex-col justify-between min-h-screen root bg-dark-500 soft-switch">
    <navbar />
    <Nuxt style="padding-top: 104px" />
    <page-footer class="mt-20" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({
  head(this: DefaultLayout): object {
    return {
      bodyAttrs: {
        class: this.mode,
      },
    }
  },
})
export default class DefaultLayout extends Vue {
  get mode() {
    return this.$store.getters['mode']
  }
}
</script>

<style>
html {
  font-family: 'Mabry Pro', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
