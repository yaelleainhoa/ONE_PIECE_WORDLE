<script setup>
import Case from './Case.vue'

defineProps({
})
</script>

<template>
  <div class="characterLine">
    <Case value="Nico Robin" image="https://static.printler.com/cache/8/9/d/7/2/a/89d72a714be71411cb521f59c86111d13eee5bf5.jpg"></Case>
    <Case value="Chapeau de paille"></Case>
    <Case value="1,80m"></Case>
  </div>
</template>

<style scoped>
.characterLine{
  display: flex;
  margin:5px;
}

@media (min-width: 1024px) {
}
</style>
