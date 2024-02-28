<script setup>

import {getCharactersSuggestions} from '@/services/api/opAPI.js'
import {ref, computed} from 'vue'

</script>

<template>
    <div>
      <div class="guess">
        <input
          type="text"
          id="search"
          v-model="searchTerm"
          placeholder="Type here..."
          @input="setSuggestions"
        >
        <ul
          v-if="searchCharacters.length"
        >
          <li
              v-for="character in searchCharacters"
              :key="character.name"
              @click="selectCharacter(character)"
          >
            {{ character.name }}
          </li>
        </ul>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'ResearchCharacter',
    // created: function(){
    //   this.setSuggestions();   
    // },
    data() {
    let searchTerm = ref('')
    let selectedCharacter = ref('')

    const selectCharacter = (character) => {
      this.searchTerm =""
      this.searchCharacters = []
      this.$emit("selectCharacter", character.id)
    }

    return {
      searchTerm,
      searchCharacters : [],
      selectCharacter,
      selectedCharacter,
      suggestionLimitation : 5
    }
    },
    methods: {
        setSuggestions: async function(){
            // if(this.searchTerm.length >= 3){
            let characterSuggestion = await getCharactersSuggestions(this.searchTerm, this.suggestionLimitation);
            this.searchCharacters = characterSuggestion;
            console.log("set suggestions : ",this.searchTerm, "and searchCharacters: ", this.searchCharacters);
            // }
        },
    }
  }
</script>

<style scoped>

.guess
{
    display: flex;
    flex-direction: column;
    align-items: center;
}



@media (min-width: 1024px) {
}
</style>
