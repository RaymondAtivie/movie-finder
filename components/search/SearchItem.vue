<template>
  <div class="flex items-center px-2 py-2">
    <div class="w-8 h-10 mr-3 bg-black">
      <img v-if="movie.thumbnailUrl" class="w-full h-full object-conatin" :src="movie.thumbnailUrl" />
      <div
        v-else
        class="flex items-center justify-center w-full h-full p-1 text-xs text-center text-white bg-gray-700 object-conatin"
      >NO IMAGE</div>
    </div>

    <div class="flex-1">{{ movie.title }}</div>
    <div>{{ movie.year }}</div>
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
