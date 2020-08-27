<template>
  <main class="flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto">
    <div class="self-stretch px-4 mt-16 text-center md:mt-20 md:px-20">
      <!-- <logo class="w-32 mx-auto md:w-auto" /> -->
      <h1 class="mt-20 text-4xl font-medium text-white md:text-5xl soft-switch">MovieFinder</h1>
      <p class="text-dark-100">Want to find out about a movie? We've got you!</p>

      <search-bar class="mt-8" />
    </div>

    <div class="mt-56">
      <h2
        class="ml-2 text-xl text-left text-white soft-switch md:text-4xl md:text-center"
      >New Releases</h2>

      <div class="flex flex-wrap w-full mt-6" v-if="popularMovies">
        <nuxt-link
          :to="`/movie/${movie.id}`"
          class="w-1/2 px-1 mb-10 md:w-1/4 md:px-3"
          v-for="(movie, index) in popularMovies"
          :key="index"
        >
          <movie :movie="movie" />
        </nuxt-link>
      </div>

      <div class="flex flex-wrap w-full mt-6" v-else>
        <div class="w-1/2 px-1 mb-10 md:w-1/4 md:px-3" v-for="i in 4" :key="i+'index'">
          <movie-skeleton />
        </div>
      </div>
    </div>
  </main>
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

<style>
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 350ms;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
