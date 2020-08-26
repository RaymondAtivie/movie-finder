<template>
  <div class="relative w-full bg-black" style="height: 450px">
    <img :src="movie.posterUrl" class="object-contain w-full h-full" />
    <div class="absolute bottom-0 w-full p-4 text-white bg-black bg-opacity-75">
      <div>{{ movie.title }}</div>
      <div>{{ movie.year }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'

@Component
export default class Slide extends Vue {
  @Prop({ required: true }) movie!: Movie
  @Prop({ default: false }) active!: boolean
}
</script>
