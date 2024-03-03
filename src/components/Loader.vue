<script setup>

defineProps({
})
</script>

<template>
  <span class="loader"></span>
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
    width: 20px;
    height: 20px;
    margin: auto;
    border: 3px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 

@media (min-width: 1024px) {
}
</style>
