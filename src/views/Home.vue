<script setup lang="ts">

import Header from '@/components/Header.vue';

</script>

<template>
    <div id="home">
      <Header></Header>
      <nav class="nav">
        <div class="games">
          <RouterLink class="shadowElement" to="/classic">
            <button>
              <h2>Classic</h2>
              <p>Get clues at every try</p>
            </button>
          </RouterLink>
        </div>

        <RouterLink class="policy shadowElement" to="/policy">
          Legal Disclaimer: Content Rights
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
  bottom: 12px;
  color: #fff;
  width: 100vw;
  left: 0px;
}

#home{
  height:100vh;
}


#appContent{
  height:100vh;
}

</style>