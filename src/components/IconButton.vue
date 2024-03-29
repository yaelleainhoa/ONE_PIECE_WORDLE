<script setup>
defineProps({
  image: {
    default: "../assets/info.png",
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
            <img :src="img">
        </div>
        <p>{{value}}</p>
    </button>
</template>

<script>
export default {
  name: 'IconButton',
  data() {
    return {
        img: this.image
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
    width: var(--icon-width);
    height: var(--icon-width);
    display: flex;
    align-items: center;
}

@media (min-width: 1024px) {
}
</style>
