<template>
  <div tabindex="0" class="flex items-center px-3 py-3 border-b focus:outline-none focus:bg-red-100">
    <div class="w-10 mr-3 overflow-hidden bg-black rounded-md h-14">
      <img v-if="movie.thumbnailUrl" class="object-cover w-full h-full" :src="movie.thumbnailUrl" />
      <div
        v-else
        class="flex items-center justify-center w-full h-full p-1 text-xs text-center text-white bg-gray-700 object-conatin"
      >NO IMAGE</div>
    </div>

    <div class="flex-1 text-xl font-medium text-left text-gray-800">{{ movie.title }}</div>
    <div class="text-gray-700">{{ movie.year }}</div>
    <div
      style="top: 10px; right: 10px"
      class="inline-flex items-center justify-center px-2 ml-4 text-sm font-medium text-white rounded-md"
      :class="movie.rating <= 7 ? 'bg-red-600' : 'bg-green-600'"
    >{{ (movie.rating).toFixed(1) }}</div>
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
