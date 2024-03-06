<script setup>

import {getCharactersSuggestions} from '@/services/api/opAPI.js'
import Loader from '@/components/Loader.vue'
import {ref} from 'vue'

defineProps({
  loading: {
    default: true
  },
  reset: {
    default: false
  }
})

</script>

<template>
    <div class="ResearchCharacter">
      <div class="guess">
        <input
          type="text"
          id="search"
          v-model="searchTerm"
          placeholder="Type here..."
          @input="handleInput"
          autocomplete="off"
          @click="seeSuggestions"
          @blur="handleBlur"
        >
        <ul
          v-if="suggestionsVisible"
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
      <Loader :loading></Loader>
    </div>
  </template>

  <script>
  export default {
    name: 'ResearchCharacter',
    // created: function(){
    //   this.setSuggestions();   
    // },
    components: {
      Loader
    },
    watch: {
      reset: function(reset) {
        if(reset)
        {
          this.resetResearch()
        }
      }
    },
    data() {
    let searchTerm = ref('')
    let selectedCharacter = ref('')

    const selectCharacter = (character) => {
      this.searchTerm =""
      this.searchCharacters = []
      if(!this.alreadySelectedCharacters.includes(character.id))
      {
        this.alreadySelectedCharacters.push(character.id)
        this.$emit("selectCharacter", character.id)
      }
    }

    return {
      searchTerm,
      searchCharacters : [],
      selectCharacter,
      selectedCharacter,
      suggestionLimitation : 5,
      alreadySelectedCharacters : [],
      suggestionsVisible: false
    }
    },
    methods: {
      handleInput: function(event) {
          const debounceTime = 300;
          if (this.debouncer) {
            clearTimeout(this.debouncer);
          }
          this.debouncer = setTimeout(() => {
            this.setSuggestions();
          }, debounceTime);
      },
      setSuggestions: async function(){
        this.searchCharacters = [];
        let characterSuggestion = await getCharactersSuggestions(this.searchTerm, this.suggestionLimitation);
        this.searchCharacters = characterSuggestion;
      },
      handleBlur: function(){
        const debounceTime = 300;
        this.debouncer = setTimeout(() => {
          this.suggestionsVisible = false;
        }, debounceTime);
      },
      seeSuggestions: function(){
        this.suggestionsVisible = true;
      },
      resetResearch: function(){
        this.alreadySelectedCharacters = []
      }
    }
  }
</script>

<style scoped>

.guess
{
  position: relative;
  display: inline-block;
}

#search
{
  width: var(--search-width);
  height: var(--search-height);
}

ul{
  position: absolute;
  padding: 0px;
  list-style-type: none;
}

li{
  width: var(--search-width);
  background-color: white;
  color:black;
}

li:hover{
  cursor:pointer;
  background-color: var(--list-hover);
}

.ResearchCharacter{
  display: flex;
  margin: auto;
  transform: translate(15px);
  /* not clean, see later */
}

@media (min-width: 1024px) {
}
</style>
