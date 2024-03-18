<script setup>
defineProps({
  image: {
    default: "info.png",
    type: String,
  },
  value: {
    default: "Click",
    type:String,
    }
})
</script>

<template>
    <button>
        <div class="icon">
            <img v-bind:src=imgSrc>
        </div>
        <p>{{value}}</p>
    </button>
</template>

<script>
export default {
  name: 'IconButton',
  data() {
    return {
      imgSrc : "/src/assets/"+this.image
    }
  },
}
</script>

<style scoped>

button{
    display: flex;
    justify-content: space-evenly;
}

img{
    width: 100%;
}

.icon{
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
}

@media (min-width: 1024px) {
}
</style>
