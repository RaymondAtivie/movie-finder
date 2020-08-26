<template>
  <div class="relative">
    <div
      @click="showDropdown = false"
      v-if="showDropdown"
      class="fixed inset-0 z-30 w-full h-full bg-opacity-50"
    ></div>

    <form
      @submit.prevent="gotoSearchPage"
      class="flex items-center justify-between w-full pb-2 border-b-2 border-dark-200"
    >
      <input
        class="relative z-50 w-full text-xl leading-none text-white bg-transparent md:text-4xl focus:outline-none placeholder-dark-200"
        placeholder="Search... "
        @focus="showDropdown = true"
        v-model="searchQuery"
        @input="debounceSearch"
      />
      <svg
        class="w-10 h-10 transform scale-75 text-dark-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.333.333c8.28 0 15 6.72 15 15 0 8.28-6.72 15-15 15-8.28 0-15-6.72-15-15 0-8.28 6.72-15 15-15zm0 26.667C21.778 27 27 21.778 27 15.333c0-6.446-5.222-11.666-11.667-11.666-6.446 0-11.666 5.22-11.666 11.666C3.667 21.778 8.887 27 15.333 27zm14.142.118l4.715 4.714-2.358 2.358-4.714-4.715 2.357-2.357z"
          fill="currentColor"
        />
      </svg>
    </form>

    <div
      v-if="showDropdown && autoCompleteMovies.length > 0"
      style="max-height: 20rem"
      class="absolute left-0 right-0 z-40 mt-2 overflow-y-auto rounded-sm shadow-lg bg-dark-300"
    >
      <nuxt-link :to="`/movie/${movie.id}`" v-for="movie in autoCompleteMovies" :key="movie.id">
        <search-item :movie="movie"></search-item>
      </nuxt-link>
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
  public autoCompleteMovies!: Movie[]

  debounceSearch = debounce(() => {
    this.search()
  }, 500)

  search() {
    this.$store.dispatch('movies/search', this.searchQuery)
  }

  gotoSearchPage() {
    this.showDropdown = false
    this.$store.commit('movies/UPDATE_SEARCH_QUERY', this.searchQuery)
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
