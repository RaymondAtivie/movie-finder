<template>
  <div>
    <div class="w-full bg-black" style="height: 300px">
      <img :src="movie.posterUrl" class="object-contain w-full h-full" />
    </div>
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
