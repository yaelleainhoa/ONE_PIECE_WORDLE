<script setup>

import IconButton from '@/components/IconButton.vue'
import icon from '../assets/difficulty.png'


</script>

<template>
    <div class="chooseDifficulty">
        <IconButton value="Change difficulty" :image="icon" @click="changeDifficulty" :class="[choosing ? 'bottomWindow' : '']"></IconButton>
        <div multiple name="levels" class="options" v-if="choosing">
          <option class="option" @click="chooseDifficulty(index)" v-for="(level, index) in difficulty"  > {{ level }} </option>
      </div>
    </div>

</template>

  <script>
  export default {
    name: 'ChooseDifficulty',
    components: {
      IconButton,
    },
    emits :{
      selectDifficulty: null,
    },
    data() {
      return {
        choosing:false,
        difficulty : {
            "10": 'Normal',
            "20": 'Manyy characters',
            "30": 'All characters'
        }
      }
    },
    created: function(){
    },
    computed: {
  },
    methods: {
        changeDifficulty()
        {
            this.choosing=!this.choosing;
        },        
        chooseDifficulty(level)
        {
            this.changeDifficulty()
            this.$emit("selectDifficulty", level)
        }
    }
  }
</script>

<style scoped>

.chooseDifficulty{
  position: relative;
  display: inline-block;
  border-top-left-radius: 5px 5px;
  border-top-right-radius: 5px 5px;
}

.options{
  position: absolute;
  background-color: var(--list-color);
  width: var(--button-width);
  animation: appear 0.8s ease-in-out;
}

.option:hover{
    cursor:pointer;
    background-color: var(--list-hover);
}

button{
  margin-bottom: 0;
  margin-left: 0;
}

@media (min-width: 1024px) {

}
</style>
