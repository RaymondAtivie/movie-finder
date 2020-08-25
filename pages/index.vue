<template>
  <div class="max-w-screen-lg mx-auto flex flex-col items-center w-full bg-purple-300 flex-1">
    <search-bar class="mt-40" />

    <div class="flex space-x-4 w-full mt-10">
      <div class="w-1/4" v-for="(item, index) in 4" :key="index">
        <movie :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'

@Component
export default class IndexPage extends Vue {
  movie: Movie = {
    id: 1,
    title: 'Edge of Tomorrow',
    director: 'Sean John',
    poster: 'sample.jpg',
    year: 2004,
  }
}
</script>
