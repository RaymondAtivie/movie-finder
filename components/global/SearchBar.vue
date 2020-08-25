<template>
  <div class="relative">
    <input
      @focus="showDropdown = true"
      @blur="showDropdown = false"
      class="border-2 w-64 px-2 py-4"
      placeholder="Search"
    />
    <div v-if="showDropdown" class="absolute bg-white rounded-md mt-2 shadow-lg right-0 left-0 overflow-y-auto h-64">
      <div
        class="py-4 px-2 border-t cursor-pointer hover:bg-gray-100"
        v-for="(item, index) in 6"
        :key="index"
      >Search Value</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class SearchBar extends Vue {
  showDropdown: boolean = false
}
</script>
