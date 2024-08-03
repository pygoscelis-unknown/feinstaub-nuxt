<script setup lang='ts'>
interface Props {
  text?: string
}

defineProps<Props>()
</script>

<template>
  <label class="block text-sm font-normal text-gray-400">
    <slot><span>{{ text }}</span></slot>
  </label>
</template>
