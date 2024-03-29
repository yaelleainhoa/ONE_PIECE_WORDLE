<script setup lang="ts">
import Header from '@/components/Header.vue';

</script>

<template>
  <Header></Header>
  <div id="appContent">
    <router-view/>
  </div>
  <RouterLink class="footer policy link shadowElement" to="/policy">
    Legal Disclaimer: Content Rights
  </RouterLink>
</template>

<style scoped>

.policy{
  position: absolute;
  font-size: 12px;
  bottom: 12px;
  width: 100vw;
  left: 0px;
}

</style>