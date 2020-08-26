<template>
  <div class="flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto">
    <div class="flex flex-wrap items-center justify-between w-full px-4 pt-10 md:flex-no-wrap">
      <div class="w-full md:w-6/12 md:order-1">
        <search-bar :initial="searchTerm" />
      </div>

      <div class="flex flex-col flex-1 w-full mt-5 md:pr-6">
        <div>Search Results for</div>
        <h2 class="text-4xl leading-none">{{ searchTerm }}</h2>
      </div>
    </div>

    <div class="w-full mt-10">
      <div>
        <slides-list />
      </div>

      <div class="flex flex-wrap w-full px-4 mt-10">
        <a
          :href="`/movie/${movie.id}`"
          class="flex-shrink-0 w-full px-3 md:w-1/4"
          v-for="movie in filteredMovies"
          :key="movie.id"
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
  public filteredMovies!: Movie[]

  @moviesStore.Getter
  public searchTerm!: string

  mounted() {
    const params = this.$route.query

    if (params.keyword) {
      this.$store.dispatch('movies/search', params.keyword)
    }
  }
}
</script>
