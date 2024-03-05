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
    <div class="hoverTextImg">
      <p>{{value}}</p>
    </div>
    <img alt="Character face" v-bind:src=image />
  </div>
  <div v-else class="case fullText" :class="[isCaseCorrect == -1 ? 'false' : isCaseCorrect == 1 ? 'correct' : 'partial']">
    <p :title=value>{{ value }}</p>
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
      if(this.isCaseCorrect==1) this.$emit("caseIsCorrect")
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
.case:hover .hoverTextImg {
  visibility: visible;
  opacity: 0.8;
}

.hoverTextImg{
  display: flex;
  align-items: center;
  background-color: black;
  width:var(--case-width);
  height: var(--case-width);
  text-align: center;
  visibility: hidden;
  opacity: 0;
  padding:8px;
  transition: opacity 0.3s;
  justify-content: center;
  position: absolute;
}

.fullText
{
  display: flex;
  align-items: center;
}

.fullText p{
  width:100%;
  padding: 4px;
  max-height:100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 1024px) {
}
</style>
