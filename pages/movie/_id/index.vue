<template>
  <div>
    <div class="w-full max-w-screen-xl mx-auto overflow-hidden bg-dark-100" style="height: 500px" v-if="movie">
      <img :src="movie.backdropUrl" class="object-cover w-full h-full" />
    </div>
    <div class="flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto">
      <div class="flex flex-col items-center justify-between w-full px-4" v-if="movie">
        <div class="flex items-start mx-10">
          <div class="flex-shrink-0 w-1/3">
            <img class="-mt-32 rounded-sm" :src="movie.posterUrl" />
          </div>

          <div class="w-2/3 pt-8 pl-8">
            <h1 class="text-3xl leading-none text-white">{{ movie.title}}</h1>

            <div class="flex mt-3 text-dark-100">
              <rating-stars :rating="movie.rating" />
              <div class="mx-4">&bullet;</div>
              <div>{{ movie.year }}</div>
            </div>

            <p class="mt-3 text-dark-100">{{ movie.overview}}</p>
          </div>
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
