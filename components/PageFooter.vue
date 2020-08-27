<template>
  <footer class="w-full pt-10 pb-20 bg-gray-800 border-t shadow-md border-dark-300">
    <div
      class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto md:flex-no-wrap"
    >
      <div class="w-full text-center md:text-left md:w-1/3">
        <nuxt-link aria-label="home" class="inline-block ml-auto" to="/">
          <logo class="h-24" white />
        </nuxt-link>
      </div>

      <div class="w-full mt-8 text-center md:text-right md:mt-0 md:w-1/3">
        <p class="text-gray-100">Developed by Raymond Ativie</p>
        <p class="text-gray-100">For LoveToKnowMedia</p>
        <p class="text-sm text-gray-100">Aug 2020</p>

        <div class="mt-10 text-xs text-center text-gray-100 md:text-right">
          <div>The Movie Database API</div>
          <a target="_blank" class="inline-block text-center md:text-right" href="https://www.themoviedb.org/">
            <img src="/api-logo.svg" class="h-10 mt-1" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
