<template>
  <img :src="source" alt="moviefinder logo" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class Logo extends Vue {
  @Prop({ default: false, type: Boolean }) white!: boolean

  get mode() {
    return this.$store.getters['mode']
  }

  get source() {
    if (this.white) return '/logo-white.png'

    if (this.mode == 'light') {
      return '/logo.png'
    }

    return '/logo-white.png'
  }
}
</script>
