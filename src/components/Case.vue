<script setup>
import { toRaw } from 'vue';
import {compareValues} from '@/services/api/opAPI.js'

defineProps({
  column: {
    default: 0,
    type:Number
  },
  image: {
    default: null,
    type: String,
  },
  values: {
    default: null
    }
})
</script>

<template>
  <div v-if="image" class="case">
    <span class="tooltipText">{{value}}</span>
    <img alt="Character face" v-bind:src=image />
  </div>
  <div v-else class="case fullText" :class="[isCaseCorrect == -1 ? 'false' : isCaseCorrect == 1 ? 'correct' : 'partial']">
    <p>{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: 'Case',
  data() {
    return {
      value: "",
      isCaseCorrect : 0
    }
  },
  created: function()
  {
    this.verifyCase();
  },
  methods:
  {
    verifyCase: function(){
      let caseValues = toRaw(this.values);
      this.isCaseCorrect = compareValues(caseValues, this.column);
      if(Array.isArray(caseValues)){
        this.value = caseValues.join(", ");
      }
      else{
        this.value=caseValues;
      }
    },
  },
}
</script>

<style scoped>
.case{
  width:var(--case-width);
  height: var(--case-width);
  border:solid;
  border-color : var(--color-border);
  border-width:2px;
  overflow: hidden;
  border-radius: 5px;
  border-width: 2px;
}
.case img
{
  width:100%;
  height:100%;
  object-fit: cover;
}

.case:hover{
  cursor:pointer;
}
.case:hover .tooltipText {
  visibility: visible;
  opacity: 1;
}

.tooltipText{
  transform: translate(0%, var(--case-width));
  width: var(--case-width);
}

.fullText
{
  display: flex;
  align-items: center;
}

.fullText p{
  width:100%;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

@media (min-width: 1024px) {
}
</style>
