<script setup>

defineProps({
  clue: {
    default: null
  },
  disabled: {
    default:false
  }
})

</script>

<template>
    <div class="showClue">
        <button :disabled="disabled" @click="showClue" :class="[showingClue ? 'bottomWindow' : '']">Give me a clue!</button>
        <div class="clue" v-if="showingClue">
          <p> {{currentClue}} </p>
      </div>
    </div>

</template>

  <script>
  export default {
    name: 'ShowClue',
    emits :{
    },
    watch: {
      clue: function(clue) {
        if(clue)
        {
          this.changeClue()
        }
      }
    },
    data() {
      return {
        showingClue:false,
        currentClue:""
      }
    },
    mounted: function(){
      console.log(this.clue)
      this.currentClue = this.clue != null ? "This character appears in the arc "+this.clue : "There is no clue yet..."
    },
    computed: {
  },
    methods: {
        showClue()
        {
            this.showingClue=!this.showingClue;
        },
        changeClue()
        {
          this.currentClue = this.clue != null ? "This character appears in the arc "+this.clue : "There is no clue yet..."
        }
    }
  }
</script>

<style scoped>

.showClue{
  position: relative;
  display: inline-block;
}

button{
  margin-bottom: 0;
  margin-left: 0;
  width: var(--button-width);
}

.clue{
  background-color: rgb(20, 22, 23);
  position: absolute;
  z-index: 10;
  width: var(--button-width);
  color: white;
  animation: appear 0.8s ease-in-out;
  padding: 10px;
}

p{
  font-size: 14px;
}

@media (min-width: 1024px) {

}
</style>
