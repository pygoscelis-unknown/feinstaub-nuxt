<template>
    <section class="py-10">
        <BaseContainer>
            <div class="w-1/2">
                <h1 class="text-5xl mb-6">feinstaub.app headline für hero section</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, aperiam? Quia ipsam est molestiae eaque aperiam, dolorem sed nulla magnam quae, assumenda aut vero! Incidunt voluptas soluta optio dignissimos ratione hic rerum voluptates dicta dolor! Eaque soluta quibusdam libero fuga autem possimus, reiciendis aliquam nostrum totam ea, doloremque perspiciatis quas!</p>  
              <div v-for='item in data'>
                <pre>
                  {{ item }}
                </pre>
              </div>
              <pre>
                  {{ data }}
                </pre>
              <pre>
                  {{ pending }}
                </pre>
              <pre>
                  {{ error }}
                </pre>
            </div>
        </BaseContainer>
    </section>
</template>

<script setup lang='ts'>

const config = useRuntimeConfig()
const { data, pending, error } = useFetch(`${config.public.apiBaseUrl}/test`)

console.log('testData', data)

</script>