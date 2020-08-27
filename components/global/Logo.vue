<template>
  <img :src=" white ? '/logo-white.png' : '/logo.png'" alt="moviefinder logo" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class Logo extends Vue {
  @Prop({ default: false, type: Boolean }) white!: boolean
}
</script>
