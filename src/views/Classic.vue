<script setup>

import CharacterLine from '@/components/CharacterLine.vue'
import ResearchCharacter from '@/components/ResearchCharacter.vue'
import {setRandomCharacterToGuess, getCharacterAttributesById} from '@/services/api/opAPI.js'

</script>

<template>
  <ResearchCharacter v-on:selectCharacter="addCharacter" id="guesser"></ResearchCharacter>
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
      CharacterLine,
      ResearchCharacter
      },
    data() {
      return {
        charactersLinesList: [],
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
        await setRandomCharacterToGuess();
      },
      addCharacter: async function(id)
      {
        console.log("ID ?? ", id)
        let characterAttributes = await getCharacterAttributesById(id)
        this.charactersLinesList.push(characterAttributes)
      }
      // sendCharacter: async function (event) {
      //   window.scroll(0,0);
      //   // let characterAttributes = await getCharacterAttributesById(event.target.value.id)
      //   // this.charactersLinesList.push(characterAttributes)
      //   let characterSuggestion = await getCharactersSuggestions(this.search, this.suggestionLimitation);
      //   this.charactersList = characterSuggestion
      //   console.log("list 1: ", event.target.value.id, " " ,characterSuggestion)
      //   // console.log("attribute SEARCs : ",await getCharactersSearch(this.search))
      //   // console.log("attributes ID :", await getCharacterAttributesById(this.currentIndex))
      //   this.search=""
      // }

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
