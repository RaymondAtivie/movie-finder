<template>
  <div class="flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto bg-dark-500">
    <div class="w-full px-4 mt-16">
      <div class="text-dark-200">
        Search Results &middot; {{ filteredMovies.length }}
        <span
          v-if="filteredMovies.length > 1"
        >Results</span>
        <span v-else>Result</span>
      </div>
      <search-bar :initial="searchTerm" />
    </div>

    <div class="w-full mt-10">
      <div>
        <!-- <slides-list /> -->
      </div>

      <div class="flex flex-wrap w-full mt-10">
        <a
          tabindex="-1"
          :href="`/movie/${movie.id}`"
          class="flex-shrink-0 w-1/2 px-1 md:px-3 md:w-1/4"
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

  created() {
    const params = this.$route.query

    if (params.keyword) {
      this.$store.dispatch('movies/search', params.keyword)
      this.$store.commit('movies/UPDATE_SEARCH_QUERY', params.keyword)
    }
  }
}
</script>
