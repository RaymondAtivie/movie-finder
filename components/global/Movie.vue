<template>
  <div
    tabindex="0"
    class="mb-10 transition-transform duration-300 transform cursor-pointer focus:scale-105 hover:scale-105 focus:outline-none"
  >
    <div class="relative w-full bg-gray-700 rounded-md" style="height: 300px">
      <img
        :src="movie.posterUrl"
        class="bottom-0 object-cover w-full h-full rounded-md"
        v-if="movie.posterUrl"
      />
      <div v-else class="flex items-center justify-center w-full h-full text-white bg-red-900 rounded-md">
        <div class="uppercase">No Image</div>
      </div>

      <div
        style="top: 10px; right: 10px"
        class="absolute inline-flex items-center justify-center px-1 text-sm font-medium text-white rounded-md"
        :class="movie.rating <= 7 ? 'bg-red-600' : 'bg-green-600'"
      >{{ (movie.rating).toFixed(1) }}</div>
      <div
        style="bottom: 10px; right: 10px"
        class="absolute inline-flex items-center justify-center px-1 text-sm font-medium text-white bg-gray-700 rounded-md"
      >{{ movie.year }}</div>
    </div>
    <h4 class="px-2 mt-4 text-xl text-center">{{ movie.title }}</h4>
    <!-- <p>{{ movie.director }}</p> -->
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
