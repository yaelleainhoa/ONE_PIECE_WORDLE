<script setup>


defineProps({
    title: {
        default: "",
        type: String
    },
    message:{
        default : [],
        type: Array
    },
    warning:{
        default:false
    }
})
</script>

<template>
    <div v-if="isVisible" class="panel shadowElement" :class="[warning ? 'warning' : '']">
        <div @click="closePanel" class="close"></div>
        <h4>{{ title }}</h4>
        <p v-for="(line, index) in message">{{ line }}</p>
    </div>
</template>

<script>
export default {
  name: 'Panel',
  data() {
    return {
        isVisible:true,
    }
  },
  methods:{
    closePanel: function(){
        this.isVisible=false;
        this.$emit("closePanel")
    }
  }
}
</script>

<style scoped>

.panel{
    background-color: var(--indication-panel);
    border-radius: 5px;
    min-width:30vw;
    width: fit-content;
    padding: 10px 30px;
    margin: 20px auto;
    max-width: 60vw;
}

.warning{
    background-color: var(--indication-warning);
}

h4{
    font-weight: 500;
}

p{
    font-size: 12px;
}

</style>
