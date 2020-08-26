<template>
  <div
    tabindex="0"
    class="flex items-center px-3 py-3 border-b border-dark-200 focus:outline-none focus:bg-dark-500 hover:bg-dark-500"
  >
    <div class="w-10 mr-3 overflow-hidden bg-black rounded-sm h-14">
      <img v-if="movie.thumbnailUrl" class="object-cover w-full h-full" :src="movie.thumbnailUrl" />
      <div
        v-else
        class="flex items-center justify-center w-full h-full p-1 text-xs text-center text-white bg-gray-700 object-conatin"
      >NO IMAGE</div>
    </div>

    <div class="flex-1 text-xl font-medium text-left text-white">
      <div>{{ movie.title }}</div>
      <rating-stars :rating="movie.rating" />
    </div>

    <div class="text-gray-200">{{ movie.year }}</div>
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
