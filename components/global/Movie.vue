<template>
  <div class="cursor-pointer focus:scale-105 focus:outline-none">
    <div
      class="relative w-full transition-transform duration-300 transform rounded-md bg-dark-200 focus:scale-105 hover:scale-105"
      style="height: 300px"
    >
      <img
        :alt="movie.title + ' poster'"
        :src="movie.posterUrl"
        class="bottom-0 object-cover w-full h-full rounded-sm shadow-md"
        v-if="movie.posterUrl"
      />
      <div
        v-else
        class="flex items-center justify-center w-full h-full text-white bg-red-900 rounded-md"
      >
        <div class="uppercase">No Image</div>
      </div>

      <div
        style="bottom: 10px; right: 10px"
        class="absolute inline-flex items-center justify-center px-2 text-xs font-medium text-white rounded-md soft-switch bg-dark-200"
      >{{ movie.year }}</div>
    </div>
    <div class="pr-2 mt-2 text-base text-left text-white soft-switch md:text-lg">{{ movie.title }}</div>
    <rating-stars :rating="movie.rating" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'

@Component
export default class MovieItem extends Vue {
  @Prop({ required: true }) movie!: Movie
}
</script>
