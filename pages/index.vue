<template>
  <div class="flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto">
    <div class="self-stretch px-4 mt-16 text-center md:mt-20 md:px-20">
      <logo white class="w-32 mx-auto mb-4 md:w-auto" />
      <search-bar />
    </div>

    <div class="mt-20">
      <h2
        class="ml-2 text-xl text-left text-white md:text-4xl md:text-center"
      >Popular Movies right now</h2>
      <div class="flex flex-wrap w-full mt-6">
        <nuxt-link
          :to="`/movie/${movie.id}`"
          class="w-1/2 px-1 md:w-1/4 md:px-3"
          v-for="(movie, index) in popularMovies"
          :key="index"
        >
          <movie :movie="movie" />
        </nuxt-link>
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
