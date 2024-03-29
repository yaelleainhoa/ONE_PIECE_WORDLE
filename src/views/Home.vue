<script setup lang="ts">

import SpoilerWarning from '@/components/SpoilerWarning.vue'

</script>

<template>
    <div id="home">

      <SpoilerWarning></SpoilerWarning>

      <nav class="nav">
        <div class="games">
          <RouterLink class="shadowElement" to="/classic">
            <button>
              <h3>CLASSIC</h3>
              <p>Get clues at every try</p>
            </button>
          </RouterLink>
        </div>

      </nav>
    </div>
  </template>

<style scoped>

.games{
  display: flex;
  flex-direction: column;
}

h3{
  font-weight: 500;
}

</style>