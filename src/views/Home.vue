<script setup lang="ts">

import Header from '@/components/Header.vue';

</script>

<template>
    <div>
      <Header></Header>
      <nav>
          <RouterLink class="shadowElement" to="/ONE_PIECE_WORDLE/classic">
            <button>
              <h2>Classic</h2>
              <p>Get clues at every try</p>
            </button>
          </RouterLink>
      </nav>
    </div>
  </template>