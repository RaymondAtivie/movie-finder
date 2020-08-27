<template>
  <div class="flex flex-col items-center flex-1 w-full max-w-screen-lg mx-auto">
    <div class="self-stretch px-4 mt-16 text-center md:mt-20 md:px-20">
      <h1 class="text-3xl text-white">Oops!</h1>
      <h1 class="text-6xl text-white">{{ error.statusCode }}</h1>
      <h1 class="text-xl text-white">{{ error.message }}</h1>

      <p class="mt-20 text-dark-100">Search for your favorite movies instead</p>

      <search-bar class="mt-4" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>

<style>
</style>
