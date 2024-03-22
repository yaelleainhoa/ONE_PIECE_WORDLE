<script setup>

import IconButton from '@/components/IconButton.vue'
import icon from '../assets/clue.png'


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
      <IconButton @blur="handleBlur" :disabled="disabled" value="First appearance" :image="icon" @click="showClue" :class="[showingClue ? 'bottomWindow' : '']"></IconButton>
      <div class="clue" v-if="showingClue">
        <p> {{currentClue}} </p>
      </div>
    </div>

</template>

  <script>
  export default {
    name: 'ShowClue',
    components: {
      IconButton
      },
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
        currentClue:"",
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
        },
        handleBlur()
        {
          this.showClue();
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
