<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'

/*let counter = ref(0)

setInterval(() => {
  counter.value++
}, 1000)*/
</script>

<template>
  <div class="bg-gray-50">

    <NavBar/>
    <main class="h-screen  ">
      
      <router-view />
    </main>
  </div>
</template>
