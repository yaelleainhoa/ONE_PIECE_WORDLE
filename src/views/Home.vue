<script setup lang="ts">

import Header from '@/components/Header.vue';

</script>

<template>
    <div id="home">
      <Header></Header>
      <nav class="nav">
        <div class="games">
          <RouterLink class="shadowElement" to="/ONE_PIECE_WORDLE/classic">
            <button>
              <h2>Classic</h2>
              <p>Get clues at every try</p>
            </button>
          </RouterLink>
        </div>

        <RouterLink class="policy shadowElement" to="/ONE_PIECE_WORDLE/policy">
          Policy
        </RouterLink>
      </nav>
    </div>
  </template>

<style scoped>

.nav{
  height:80vh;
}

.games{
  display: flex;
  flex-direction: column;
}

.policy{
  position: absolute;
  bottom:20px;
  color:white;
}

#home{
  height:100vh;
}

</style>