<template>
  <div class="relative">
    {{ filteredMovies.length }} {{ searchQuery }}
    <form class="flex" @submit.prevent>
      <input
        @focus="showDropdown = true"
        class="w-64 px-2 py-4 border-2"
        placeholder="Search"
        v-model="searchQuery"
        @input="debounceSearch"
      />
      <button type="submit" class="px-4 py-4 ml-3 text-white bg-blue-400">Search</button>
    </form>

    <div
      v-if="showDropdown"
      class="absolute left-0 right-0 h-64 mt-2 overflow-y-auto bg-white rounded-md shadow-lg"
    >
      <div
        class="border-t cursor-pointer hover:bg-gray-100"
        v-for="movie in filteredMovies"
        :key="movie.id"
      >
        <search-item :movie="movie"></search-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'

import debounce from 'lodash.debounce'

const moviesStore = namespace('movies')

@Component
export default class SearchBar extends Vue {
  searchQuery: string = ''
  showDropdown: boolean = false

  @moviesStore.Getter
  public filteredMovies!: Movie[]

  debounceSearch = debounce(() => {
    this.search()
  }, 500)

  search() {
    console.log('Now searching')
    this.$store.dispatch('movies/search', this.searchQuery)
  }
}
</script>
