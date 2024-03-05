<script setup>

defineProps({
  loading: {
    default: true
  },
})

</script>

<template>
  <span class="loader" :class="[loading ? 'loading' : '']"></span>
</template>

<script>
export default {
  name: 'Loader',
  data() {
    return {
    }
  },
  methods: {
    }
}
</script>

<style scoped >

.loader {
    width: var(--loader-width);
    height: var(--loader-width);
    margin: var(--standard-margin);
    border: 3px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    opacity: 0;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 

.loading{
  animation: rotation 1s linear infinite;
  opacity:1;
}

@media (min-width: 1024px) {
}
</style>
