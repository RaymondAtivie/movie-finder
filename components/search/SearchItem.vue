<template>
  <div class="flex items-center px-2 py-2">
    <img class="h-10 mr-3" :src="movie.thumbnailUrl" />
    <div class="flex-1">{{ movie.title }}</div>
    <div>{{ movie.release }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'

@Component
export default class SearchBar extends Vue {
  @Prop({ required: true }) movie!: Movie
}
</script>
