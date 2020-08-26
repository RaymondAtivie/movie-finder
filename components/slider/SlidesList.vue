<template>
  <div class="relative">
    <div class="overflow-hidden" ref="slideBox" style="height: 400px">
      <ul class="flex ml-3">
        <li
          v-for="movie in movies"
          :key="movie.id"
          class="pr-8 transition-transform duration-1000 ease-out"
          :style="listPosition"
        >
          <slide :movie="movie" />
        </li>
      </ul>
    </div>

    <div
      class="absolute left-0 right-0 justify-between hidden mt-10 bg-blue-300 bg-opacity-0 md:flex"
      style="top: 20%; right: -20px; left: -10px"
    >
      <button
        class="flex items-center justify-center w-12 h-12 text-white bg-red-800 rounded-full focus:outline-none"
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
        class="flex items-center justify-center w-12 h-12 text-white bg-red-800 rounded-full focus:outline-none"
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

  get listWidth() {
    return { width: this.movies.length * 100 + '%' }
  }

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
