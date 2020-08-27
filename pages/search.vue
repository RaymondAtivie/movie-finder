<template>
  <main class="flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto bg-dark-500 soft-switch">
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

    <div v-if="filteredMovies.length > 0" class="w-full mt-20 mb-64">
      <slides-list :movies="filteredMovies" />
    </div>

    <div v-else class="mt-24">
      <div class="w-full text-4xl text-left text-white">No results for this search</div>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'

const moviesStore = namespace('movies')

@Component({
  head(this: IndexPage): object {
    return {
      title: `Searching for ${this.searchTerm} | MovieFinder`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Showing results for ${this.searchTerm} on MovieFinder`,
        },
      ],
    }
  },
})
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
