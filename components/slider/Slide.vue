<template>
  <nuxt-link :to="`/movie/${movie.id}`" class="cursor-pointer focus:scale-105 focus:outline-none">
    <div
      class="relative transition-transform duration-300 transform bg-gray-700 rounded-md hover:scale-105"
      style="height: 330px; width: 230px"
    >
      <img
        :src="movie.posterUrl"
        class="bottom-0 object-cover w-full h-full rounded-sm shadow-md"
        v-if="movie.posterUrl"
      />
      <div
        v-else
        class="flex items-center justify-center w-full h-full text-gray-100 bg-red-900 rounded-md"
      >
        <div class="uppercase">No Image</div>
      </div>
    </div>
    <h4
      class="w-48 pr-2 mt-2 text-base text-left text-white truncate md:text-base"
    >{{ movie.title }}</h4>
    <rating-stars :rating="movie.rating" />
    <div
      style="bottom: 10px; right: 10px"
      class="inline-flex items-center justify-center px-2 text-xs font-medium text-gray-100 bg-red-500 rounded-md"
    >{{ movie.year }}</div>
  </nuxt-link>
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
