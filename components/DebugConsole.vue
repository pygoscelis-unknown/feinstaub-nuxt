<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'

const showDebugConsole = ref(false)

const { shift, space, d } = useMagicKeys()

watchEffect(() => {
  if (shift?.value && space?.value && d?.value)
    showDebugConsole.value = !showDebugConsole.value
})
</script>

<template>
  <div
    v-if="showDebugConsole"
    class="fixed bottom-4 left-4 z-[999] mx-auto border-white bg-gray-100 rounded-xl shadow-lg bg-opacity-50 p-4"
  >
    <slot />
  </div>
</template>
