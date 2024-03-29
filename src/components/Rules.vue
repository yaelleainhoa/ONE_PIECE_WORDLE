<script setup>

import Panel from '@/components/Panel.vue'

</script>

<template>
    <p v-if="isVisible" class="showRules link" @click="showRules">Rules</p>
    <Panel v-if="!isVisible" v-on:closePanel="showRules" class="rules" title="Guess the character" :message=rules></Panel>
</template>

<script>
export default {
  name: 'Rules',
  components: {
      Panel
      },
  data() {
    return {
        rules:["Type the name of a character and see which characteristics it has in common with the one you have to guess.",
        "For example, if you enter Nico Robin and the case Group is green, this means the character you're looking for also is a Pirate! If the Race color is red, it means your character is not a Human like Robin... Finally, if the color of Crews is orange, it means the case is partially correct, so one or more of the crews are in common!",
        "Good luck, you have as many as guesses as you want, you can ask for a clue.. do your best!"],
        isVisible:true,
    }
  },
  methods:{
    showRules: function(){
        console.log("YO")
        this.isVisible=!this.isVisible;
    }
  }
}
</script>

<style scoped>

.rules{
    background-color: var(--indication-panel);
}

.showRules{
    margin: 20px auto;
    font-weight: 300;
    font-size: 14px;
    text-decoration: underline #fff;
}

.showRules:hover{
    cursor: pointer;
}

p{
    font-weight: 200;
}

</style>
