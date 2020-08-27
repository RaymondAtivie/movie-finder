<template>
  <main>
    <template v-if="!movie">
      <div
        class="absolute w-full max-w-screen-xl mx-auto overflow-hidden animate-pulse md:relative md:block bg-dark-300"
      >
        <div style="height: 500px"></div>
      </div>
      <div class="relative flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto">
        <div class="flex flex-col items-center justify-between w-full px-4">
          <div class="flex flex-wrap items-start w-full md:mx-10 md:flex-no-wrap">
            <div class="flex-shrink-0 w-full px-10 md:w-1/3">
              <div class="w-full mt-8 rounded-sm bg-dark-200 md:-mt-32" style="height: 400px"></div>
            </div>

            <div class="flex flex-col w-full mt-6 animate-pulse">
              <div class="w-7/12 h-5 mt-2 rounded-md bg-dark-300"></div>
              <div class="w-8/12 h-5 mt-2 rounded-md bg-dark-300"></div>
              <div class="w-11/12 h-20 mt-2 rounded-md bg-dark-300"></div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div
      class="absolute w-full max-w-screen-xl mx-auto overflow-hidden md:relative md:block bg-dark-300"
      v-else
    >
      <template v-if="movie.backdropUrl">
        <img
          :src="movie.backdropUrl"
          class="hidden object-cover w-full md:block"
          style="height: 500px"
        />
        <img
          :src="movie.backdropUrl"
          class="block object-cover w-full md:hidden"
          style="height: 200px"
        />
      </template>
      <div v-else style="height: 500px"></div>

      <div
        class="absolute inset-0 items-center justify-center hidden w-full h-full md:flex"
        v-if="movie.backdropUrl"
      >
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
        <div class="flex flex-wrap items-start md:mx-10 md:flex-no-wrap">
          <div class="flex-shrink-0 w-full px-10 md:w-1/3">
            <img class="mt-8 rounded-sm md:-mt-32" :src="movie.posterUrl" />
          </div>

          <div class="w-full pt-8 md:px-0 md:w-2/3 md:pl-8">
            <h1 class="text-2xl leading-none text-white md:text-3xl">{{ movie.title}}</h1>

            <div class="flex mt-3 text-dark-100">
              <rating-stars :rating="movie.rating" />
              <div class="mx-4">&bullet;</div>
              <div>{{ movie.year }}</div>
            </div>

            <p class="mt-3 text-dark-100">{{ movie.overview}}</p>

            <template v-if="casts.length > 0">
              <div class="mt-6 text-dark-100">Casts</div>
              <div class="flex flex-wrap mt-3">
                <div
                  class="w-20 mb-6 mr-2 text-center md:mr-6"
                  v-for="cast in casts"
                  :key="cast.id"
                >
                  <div class="relative w-16 h-16 mx-auto rounded-full bg-dark-300">
                    <img
                      :src="cast.pictureUrl"
                      class="absolute object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <div class="mt-3 text-xs leading-tight text-center text-white">{{ cast.name }}</div>
                </div>
              </div>
            </template>

            <template v-if="directors.length > 0">
              <div class="mt-6 text-dark-100">
                <span v-if="directors.length > 1">Directors</span>
                <span v-else>Director</span>
              </div>
              <div class="flex flex-wrap mt-3 md:flex-no-wrap">
                <div
                  class="w-20 mb-6 mr-2 text-center md:mr-6"
                  v-for="director in directors"
                  :key="director.id"
                >
                  <div class="relative w-16 h-16 mx-auto rounded-full bg-dark-300">
                    <img
                      :src="director.pictureUrl"
                      class="absolute object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <div class="mt-3 text-xs leading-tight text-center text-white">{{ director.name }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </main>
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
  directors: Cast[] = []

  playVideo() {
    this.$toast.info("Sorry! It's actually just an image 😅", {
      duration: 2000,
    })
  }

  getCast(movie_id: number | string) {
    const key = this.$store.state.key
    this.$axios.get(`/movie/${movie_id}/credits?api_key=${key}`).then((res) => {
      const crew = res.data.crew as any[]
      const directors = crew.filter((c) => c.job == 'Director')

      this.casts = Cast.fromArray(res.data.cast.splice(0, 10))
      this.directors = Cast.fromArray(directors)
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
