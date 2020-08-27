<template>
  <div class="cursor-pointer focus:scale-105 focus:outline-none">
    <div class="w-full max-w-sm mx-auto rounded-md">
      <div class="flex flex-col w-full animate-pulse">
        <div class="w-full rounded-md bg-dark-300" style="height: 300px; width: 230px"></div>

        <div class="w-11/12 h-5 mt-2 rounded-md bg-dark-300"></div>
        <div class="w-9/12 h-5 mt-2 rounded-md bg-dark-300"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class MovieSkeleton extends Vue {}
</script>
