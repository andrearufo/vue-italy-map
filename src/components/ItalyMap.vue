<script setup>
import { regions } from '../regions.js'

const selected = defineModel({ type: String, default: null })
const emit = defineEmits(['select'])

function pick(region) {
  selected.value = region.id
  emit('select', { id: region.id, name: region.name })
}
</script>

<template>
  <svg
    class="italy-map"
    viewBox="0 0 728.2 864.1"
    xmlns="http://www.w3.org/2000/svg"
    role="group"
    aria-label="Mappa delle regioni italiane"
  >
    <path
      v-for="region in regions"
      :key="region.id"
      :d="region.d"
      :class="['italy-map__region', { 'is-active': selected === region.id }]"
      :data-region="region.id"
      role="button"
      tabindex="0"
      :aria-label="region.name"
      :aria-pressed="selected === region.id"
      @click="pick(region)"
      @keydown.enter.prevent="pick(region)"
      @keydown.space.prevent="pick(region)"
    >
      <title>{{ region.name }}</title>
    </path>
  </svg>
</template>

<style>
.italy-map {
  display: block;
  width: 100%;
  height: 100%;
}
.italy-map__region {
  fill: var(--italy-map-fill, #d4d4d8);
  stroke: var(--italy-map-stroke, #fff);
  stroke-width: var(--italy-map-stroke-width, 1);
  cursor: pointer;
  outline: none;
  transition: fill 0.15s;
}
.italy-map__region:hover,
.italy-map__region:focus-visible {
  fill: var(--italy-map-hover, #a1a1aa);
}
.italy-map__region.is-active {
  fill: var(--italy-map-active, #16a34a);
}
</style>
