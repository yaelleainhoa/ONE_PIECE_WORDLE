<script setup>

import CharacterLine from '@/components/CharacterLine.vue'
import {getCharacters, getCharacterAttributes, setRandomCharacterToGuess} from '@/services/api/opAPI.js'
import { toRaw } from 'vue';

</script>

<template>
  <div id="guesser">
    <input v-on:keyup.enter="sendCharacter()" type="search" class="input" v-model="search" list="characterSuggestion" placeholder="Enter Character">
    <datalist id="characterSuggestion">
      <option v-for="character in charactersList.slice(0, 10)"> {{ character  }}</option>
    </datalist>
    <button @click="sendCharacter()">Send</button>
  </div>
  <div class="characters">
        <CharacterLine v-for="character in charactersLinesList" :characterAttributes=character></CharacterLine>
  </div>
  <nav>
      <RouterLink to="/">Home</RouterLink>
  </nav>

  <RouterView />
</template>

  <script>
  export default {
    name: 'Home',
    components: {
      CharacterLine
      },
    data() {
      return {
        charactersList: [], //will depend on the level
        charactersLinesList: [],
        search: "",
        currentIndex:2
      }
    },
    created: function(){
      this.retrieveCharacterData();   
    },
    computed: {
    mainCharacter: function(){
      let Character = this.CharactersData[0];
      return Character;
    },
  },
    methods: {
      async retrieveCharacterData() { 
        this.charactersList = ["Nico Robin", "Nami", "Monkey D Luffy", "Roronoa Zoro", "Sanji Vinsmoke", "Jinbei", "Franky", "Brook", "Chopper", "Usopp"]
        await setRandomCharacterToGuess();
        // console.log("attributes :", await getCharacterAttributes(1)) //['<property_name>'])
      },

      sendCharacter: async function () {
        window.scroll(0,0);
        let characterAttributes = await getCharacterAttributes(this.currentIndex)
        this.charactersLinesList.push(characterAttributes)
        console.log("attributes : ",characterAttributes)
        this.search=""
      }

    }
  }
</script>

<style scoped>

#guesser{
  margin: 20px 0px;
}
.characters{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
