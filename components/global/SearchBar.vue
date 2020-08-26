<template>
  <div class="relative">
    <div
      @click="showDropdown = false"
      v-if="showDropdown"
      class="fixed inset-0 z-40 w-full h-full bg-opacity-50"
    ></div>
    <form
      @submit.prevent="gotoSearchPage"
      class="relative z-50 flex transition-all duration-150 ease-out transform rounded-sm"
      :class="showDropdown ? 'shadow-lg' : ''"
    >
      <input
        @focus="showDropdown = true"
        class="w-full px-6 py-4 border-t border-b border-l rounded-l-lg focus:outline-none"
        placeholder="Search for movies by thier title"
        v-model="searchQuery"
        @input="debounceSearch"
      />
      <button
        type="submit"
        class="h-16 px-8 text-lg font-bold text-white bg-red-500 rounded-r-lg"
      >Search</button>
    </form>

    <div
      v-if="showDropdown && filteredMovies.length > 0"
      style="max-height: 20rem"
      class="absolute left-0 right-0 z-40 mt-2 overflow-y-auto bg-white rounded-md shadow-lg"
    >
      <a
        :href="`/movie/${movie.id}`"
        class="border-b cursor-pointer hover:bg-red-100"
        v-for="movie in filteredMovies"
        :key="movie.id"
      >
        <search-item :movie="movie"></search-item>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, namespace } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'

import debounce from 'lodash.debounce'

const moviesStore = namespace('movies')

@Component
export default class SearchBar extends Vue {
  @Prop({ default: '' }) initial!: string

  searchQuery: string = ''
  showDropdown: boolean = false

  @moviesStore.Getter
  public filteredMovies!: Movie[]

  debounceSearch = debounce(() => {
    this.search()
  }, 500)

  search() {
    window.history.replaceState(
      null,
      document.title,
      `?keyword=${this.searchQuery}`
    )
    this.$store.dispatch('movies/search', this.searchQuery)
  }

  gotoSearchPage() {
    this.search()
    this.$router.push(`/search?keyword=${this.searchQuery}`)
  }

  mounted() {
    if (this.initial) {
      this.searchQuery = this.initial
    }
  }
}
</script>
