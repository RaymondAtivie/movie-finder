<template>
  <div>
    <img :src="movie.posterUrl" />
    <h4>
      {{ movie.title }} &middot;
      <span>{{ movie.release }}</span>
    </h4>
    <!-- <p>{{ movie.director }}</p> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Movie from '@/models/Movie'

@Component
export default class SearchBar extends Vue {
  @Prop({ required: true }) movie!: Movie
}
</script>
