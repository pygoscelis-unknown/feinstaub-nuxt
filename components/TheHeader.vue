<script setup lang='ts'>
</script>

<template>
  <header class="dark:bg-zinc-900 py-4">
    <BaseContainer class="flex justify-between">
      <div class="flex gap-6">
        <NuxtLink to="/">
          <span class="font-bold">feinstaub.app</span>
        </NuxtLink>
        <nav>
          <ul class="flex space-x-4">
            <li>
              <NuxtLink to="/map">
                Map
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <ColorModeButton />
    </BaseContainer>
  </header>
</template>
