<template>
  <div class="flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto">
    <div class="self-stretch px-20 mt-20 text-center">
      <logo class="mx-auto mb-4" />
      <search-bar />
    </div>

    <div class="mt-20">
      <h2 class="ml-2 text-4xl text-center">Popular Movies</h2>
      <div class="flex flex-wrap w-full mt-6">
        <a
          :href="`/movie/${movie.id}`"
          class="w-1/4 px-3"
          v-for="(movie, index) in popularMovies"
          :key="index"
        >
          <movie :movie="movie" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'

const moviesStore = namespace('movies')

@Component
export default class IndexPage extends Vue {
  @moviesStore.Getter
  public popularMovies!: Movie[]

  mounted() {
    this.$store.dispatch('movies/loadPopularMovies')
  }
}
</script>
