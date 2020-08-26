<template>
  <div class="px-12 overflow-x-hidden bg-red-200">
    <ul class="flex" :style="listWidth">
      <li
        class="px-2 duration-200 ease-in-out translate-transform"
        v-for="(movie, index) in filteredMovies"
        :key="movie.id"
        :style="listPosition"
      >
        <slide :movie="movie" :active="index == slideIndex" />
      </li>
    </ul>

    <div class="flex justify-between">
      <button @click="prev()">Prev</button>
      <button @click="next()">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'

const moviesStore = namespace('movies')

@Component
export default class SlideList extends Vue {
  @moviesStore.Getter
  public filteredMovies!: Movie[]

  @moviesStore.Getter
  public slideIndex!: number

  get listWidth() {
    return { width: this.filteredMovies.length * 100 + '%' }
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
    if (this.slideIndex == this.filteredMovies.length - 1) return

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
    this.$el.addEventListener('touchstart', (e: any) => this.touchStart(e))
    this.$el.addEventListener('touchmove', (e: any) => this.touchMove(e))
    this.$el.addEventListener('touchend', () => this.touchEnd())
  }
}
</script>
