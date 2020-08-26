<template>
  <div class="flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto bg-purple-300">
    <search-bar class="mt-20" />

    <div class="mt-10">
      <h2>Popular Movies</h2>
      <div class="flex flex-wrap w-full">
        <div class="w-1/4 px-6" v-for="(movie, index) in popularMovies" :key="index">
          <movie :movie="movie" />
        </div>
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
