<script setup>
import Case from './Case.vue'

defineProps({
  characterAttributes: {
    default: null,
    type: Array,
  },
  attributesList: {
    default:[],
    type:Array
  }
})
</script>

<template>
  <div class="characterLine">
    <div v-for="(attribute, index) in characterAttributes" :key="index" class="case-wrapper" v-show="!attributesList[index].hidden">
      <Case v-on:caseIsCorrect="addCorrectCase" :values=attribute.values :image=attribute.image :column=index></Case>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterLine',
  data() {
    return {
      correctCasesNb : 0
    }
  },
  mounted()
  {  
    this.fadeInCases();
  },
  methods: {
      fadeInCases() {
        const caseWrappers = this.$el.querySelectorAll('.case-wrapper');
        let visibleCount = 0;
        caseWrappers.forEach((wrapper, index) => {
          if(!this.attributesList[index].hidden){
            visibleCount++;
          }
          setTimeout(() => {
            wrapper.style.opacity = 1;
            wrapper.style.transitionDelay = 0;
          }, visibleCount * 500);
        });
      },

      addCorrectCase :function() {
        this.correctCasesNb++;
        if(this.correctCasesNb == this.characterAttributes.length)
        {
          setTimeout(() => {
            this.$emit("checkAnswer")
          }, this.characterAttributes.length * 400)  
        }
      }
    }
}
</script>

<style scoped >

.case-wrapper {
    opacity: 0;
    transition: opacity 0.5s ease;
    margin: 2px;
  }
.characterLine{
  display: flex;
  margin: 5px 0px;
  width: fit-content;
}

@media (min-width: 1024px) {
}
</style>
