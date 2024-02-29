<script setup>

</script>

<template>
    <div>
        <button @click="changeDifficulty">Change difficulty</button>
    </div>
    <div multiple name="levels" class="frontWindow" v-if="choosing">
        <div class="close" @click="changeDifficulty"></div>
        <option class="option" @click="chooseDifficulty(index)" v-for="(level, index) in difficulty"  > {{ level }} </option>
    </div>
</template>

  <script>
  export default {
    name: 'ChooseDifficulty',
    data() {
      return {
        choosing:false,
        difficulty : {
            "10": 'Difficult',
            "20": 'Hardcore',
            "30": 'Impossible'
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

.option:hover{
    cursor:pointer;
    background-color: var(--color-border-hover);
}

@media (min-width: 1024px) {

}
</style>
