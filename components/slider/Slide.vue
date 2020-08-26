<template>
  <div tabindex="0" class="mb-10 cursor-pointer focus:scale-105 focus:outline-none">
    <div
      class="relative transition-transform duration-300 transform bg-gray-700 rounded-md"
      style="width: 210px"
    >
      <img
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
    </div>
    <h4
      class="w-48 pr-2 mt-2 text-base text-left text-white truncate md:text-base"
    >{{ movie.title }}</h4>
    <rating-stars :rating="movie.rating" />
    <div
      style="bottom: 10px; right: 10px"
      class="inline-flex items-center justify-center px-2 text-xs font-medium text-white bg-red-500 rounded-md"
    >{{ movie.year }}</div>
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
