<template>
  <div class="relative">
    <div class="flex items-center py-5 overflow-hidden" ref="slideBox">
      <ul v-if="movies" class="flex items-center ml-3">
        <li
          v-for="movie in movies"
          :key="movie.id"
          class="pr-8 transition-transform duration-1000 ease-in-out"
          :style="listPosition"
        >
          <slide :movie="movie" />
        </li>
      </ul>

      <ul v-else class="flex items-center ml-3">
        <li
          v-for="i in 3"
          :key="i+'sk'"
          class="pr-8 transition-transform duration-1000 ease-in-out"
          :style="listPosition"
        >
          <movie-skeleton />
        </li>
      </ul>
    </div>

    <button
      class="absolute left-0 items-center justify-center hidden w-12 h-12 text-white bg-red-800 rounded-full md:flex focus:outline-none"
      @click="prev()"
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6 text-white transform rotate-180 chevron-right"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
    <button
      class="absolute right-0 items-center justify-center hidden w-12 h-12 text-white bg-red-800 rounded-full md:flex focus:outline-none"
      @click="next()"
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6 text-white chevron-right"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace, Prop } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'

const moviesStore = namespace('movies')

@Component
export default class SlideList extends Vue {
  @Prop({ default: [], type: Array }) movies!: Movie[]

  @moviesStore.Getter
  public slideIndex!: number

  get listPosition() {
    return { transform: `translateX(-${this.slideIndex * 100}%)` }
  }

  prev() {
    if (this.slideIndex == 0) return

    const newIndex = this.slideIndex - 1
    this.$store.commit('movies/UPDATE_SLIDE_INDEX', newIndex)
  }

  next() {
    if (this.slideIndex == this.movies.length - 1) return

    const newIndex = this.slideIndex + 1
    this.$store.commit('movies/UPDATE_SLIDE_INDEX', newIndex)
  }

  touch = {
    startX: 0,
    endX: 0,
  }
  touchStart(event: TouchEvent) {
    this.touch.startX = event.touches[0].clientX
    this.touch.endX = 0
  }
  touchMove(event: TouchEvent) {
    this.touch.endX = event.touches[0].clientX
  }
  touchEnd() {
    if (!this.touchEnd) return
    if (Math.abs(this.touch.endX - this.touch.startX) < 30) return

    if (this.touch.endX < this.touch.startX) {
      this.next()
    } else {
      this.prev()
    }
  }

  mounted() {
    const slideBox = this.$refs.slideBox as HTMLElement

    slideBox.addEventListener('touchstart', (e: any) => this.touchStart(e))
    slideBox.addEventListener('touchmove', (e: any) => this.touchMove(e))
    slideBox.addEventListener('touchend', () => this.touchEnd())
  }
}
</script>
