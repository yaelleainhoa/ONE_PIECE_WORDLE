<script setup>
defineProps({
  image: {
    default: null,
    type: String,
  },
  value: {
    default: null,
    type: Array
  }
})
</script>

<template>
  <div v-if="image" class="case">
    <span class="tooltipText">{{value}}</span>
    <img alt="Character face" v-bind:src=image />
  </div>
  <div v-else class="case fullText">
    <p>{{ value }}</p>
  </div>
</template>

<style scoped>
.case{
  width:var(--case-width);
  height: var(--case-width);
  background : var(--color-case);
  border:solid;
  border-color : var(--color-border);
  border-width:1px;
  overflow: hidden;
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
