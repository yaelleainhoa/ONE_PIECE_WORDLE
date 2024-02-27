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
    <div v-for="(attribute, index) in characterAttributes" :key="index" class="case-wrapper" :style="{ transitionDelay: `${index * 0.2}s` }">
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
  created()
  {
    console.log("!!!!!", this.characterAttributes)
  },
  mounted()
  {  
    this.fadeInCases();
  },
  methods: {
      fadeInCases() {
        const caseWrappers = this.$el.querySelectorAll('.case-wrapper');
        caseWrappers.forEach((wrapper, index) => {
          setTimeout(() => {
            wrapper.style.opacity = 1;
          }, index * 200);
        });
      }
    }
}
</script>

<style scoped >

.case-wrapper {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
.characterLine{
  display: flex;
  margin:5px;
  width: fit-content;
}

@media (min-width: 1024px) {
}
</style>
