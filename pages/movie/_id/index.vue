<template>
  <div class="flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto">
    <div class="flex flex-col items-center justify-between w-full px-4 pt-10" v-if="movie">
      <div class="w-full overflow-hidden" style="height: 500px">
        <img :src="movie.backdropUrl" class="object-cover w-full h-full" />
      </div>
      <div class="flex items-end mx-10 -mt-32">
        <div class="flex-shrink-0 w-1/3">
          <img :src="movie.posterUrl" />
        </div>
        <div class="w-2/3 pl-8">
          <h1>{{ movie.title}}</h1>
          <h1>{{ movie.release}}</h1>
          <h1>{{ movie.overview}}</h1>
          <h1>{{ movie.rating}}</h1>
        </div>
      </div>
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
