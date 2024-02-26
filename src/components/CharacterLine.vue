<script setup>
import Case from './Case.vue'

defineProps({
  characterAttributes: {
    default: null,
    type: Array,
  },
})
</script>

<template>
  <div class="characterLine">
    <div v-for="(attribute, index) in characterAttributes" :key=attribute.id>
      <Case :values=attribute.values :image=attribute.image :column=index></Case>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterLine',
  data() {
    return {
    }
  },
  created: function()
  {  
  }
}
</script>

<style scoped>
.characterLine{
  display: flex;
  margin:5px;
}

@media (min-width: 1024px) {
}
</style>
