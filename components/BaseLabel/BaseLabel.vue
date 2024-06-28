<script setup lang='ts'>
interface Props {
  text?: string
}

defineProps<Props>()
</script>

<template>
  <label class="block text-sm font-medium text-gray-700">
    <slot><span>{{ text }}</span></slot>
  </label>
</template>
