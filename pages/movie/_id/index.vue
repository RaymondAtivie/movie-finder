<template>
  <div>
    <div
      class="relative max-w-screen-xl mx-auto overflow-hidden w-ful bg-dark-100"
      style="height: 500px"
      v-if="movie"
    >
      <img :src="movie.backdropUrl" v-if="movie.backdropUrl" class="object-cover w-full h-full" />
      <div class="absolute inset-0 flex items-center justify-center w-full h-full">
        <div
          @click="playVideo()"
          class="flex items-center justify-center w-20 h-20 mx-auto bg-red-600 rounded-full cursor-pointer"
        >
          <svg
            width="28"
            height="32"
            viewBox="0 0 28 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27 14.2679C28.3333 15.0377 28.3333 16.9623 27 17.7321L3 31.5885C1.66667 32.3583 -1.54721e-06 31.396 -1.47991e-06 29.8564L-2.68545e-07 2.14359C-2.01247e-07 0.603992 1.66667 -0.35826 3 0.411541L27 14.2679Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="relative flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto">
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

            <div class="mt-6 text-dark-100">Casts</div>

            <div class="flex mt-3">
              <div class="w-20 mr-6 text-center" v-for="cast in casts" :key="cast.id">
                <div class="relative w-16 h-16 mx-auto rounded-full bg-dark-300">
                  <img :src="cast.pictureUrl" class="absolute object-cover w-full h-full rounded-full" />
                </div>
                <div class="mt-3 text-xs leading-tight text-center text-white">{{ cast.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'
import Cast from '@/models/Cast'

@Component({
  head(this: MoviePage): object {
    return {
      title: `${this.movie?.title} | MovieFinder`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Details for ${this.movie?.title} on MovieFinder`,
        },
      ],
    }
  },
})
export default class MoviePage extends Vue {
  movie: Movie | null = null
  casts: Cast[] = []

  playVideo() {
    this.$toast.info("Sorry! It's actually just an image 😅", {
      duration: 2000,
    })
  }

  getCast(movie_id: number | string) {
    this.$axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=9099d4a456925cc52c8aed25ab61ba4e`
      )
      .then((res) => {
        // console.log(res.data.cast.splice(0, 5))
        console.log(res.data.crew)

        this.casts = Cast.fromArray(res.data.cast.splice(0, 5))
      })
  }

  async loadMovie(movie_id: string) {
    const movie = await this.$store.dispatch('movies/getMovie', movie_id)
    this.movie = movie
  }

  mounted() {
    const params = this.$route.params
    this.loadMovie(params.id)
    this.getCast(params.id)
  }
}
</script>
