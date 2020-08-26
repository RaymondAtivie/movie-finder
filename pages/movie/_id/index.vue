<template>
  <div class="flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto">
    <div class="flex flex-wrap items-center justify-between w-full px-4 pt-10 md:flex-no-wrap">
      <movie v-if="movie" :movie="movie" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'

@Component({})
export default class MoviePage extends Vue {
  movie: Movie | null = null

  async loadMovie(movie_id: string) {
    console.log('loading movie')
    const movie = await this.$store.dispatch('movies/getMovie', movie_id)

    console.log(movie)

    this.movie = movie

    console.log(this.movie?.title)
  }

  mounted() {
    const params = this.$route.params

    console.log(params)

    this.loadMovie(params.id)
  }
}
</script>
