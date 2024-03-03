<script setup>

import CharacterLine from '@/components/CharacterLine.vue'
import ResearchCharacter from '@/components/ResearchCharacter.vue'
import ChooseDifficulty from '@/components/ChooseDifficulty.vue'
import Header from '@/components/Header.vue'
import CorrectAnswer from '@/components/CorrectAnswer.vue'
import {setRandomCharacterToGuess, getCharacterAttributesById} from '@/services/api/opAPI.js'

</script>

<template>
  <Header>
  </Header>
  <ChooseDifficulty v-on:selectDifficulty="selectDifficulty"></ChooseDifficulty>
  <ResearchCharacter v-on:selectCharacter="addCharacter" id="guesser"></ResearchCharacter>
  <CorrectAnswer v-if="isAnswerCorrect" :image="characterToGuess.image" :name="characterToGuess.values" :isCharacterSame="isCharacterSame"></CorrectAnswer>
  <div class="characters">
    <CharacterLine v-on:checkAnswer="checkAnswer" v-for="character in charactersLinesList" :characterAttributes=character></CharacterLine>
  </div>
  <!-- <nav>
      <RouterLink to="/">Home</RouterLink>
  </nav> -->
  <RouterView />
</template>

  <script>
  export default {
    name: 'Home',
    components: {
      CharacterLine,
      ResearchCharacter,
      ChooseDifficulty,
      Header,
      CorrectAnswer
      },
    data() {
      return {
        charactersLinesList: [],
        currentDifficulty: 10,
        characterToGuess : [],
        isAnswerCorrect : false,
        isCharacterSame :false
      }
    },
    created: function(){
      this.setRandomCharacter();   
    },
    computed: {
    mainCharacter: function(){
      let Character = this.CharactersData[0];
      return Character;
    },
  },
    methods: {
      addCharacter: async function(id)
      {
        let characterAttributes = await getCharacterAttributesById(id)
        this.charactersLinesList.push(characterAttributes)
      },
      selectDifficulty: function(difficulty)
      {
        this.currentDifficulty=difficulty;
        this.setRandomCharacter()
      },
      setRandomCharacter: async function()
      {
        this.charactersLinesList = [];
        this.isAnswerCorrect = false;
        this.isCharacterSame = false
        this.characterToGuess = await setRandomCharacterToGuess(this.currentDifficulty)
        this.characterToGuess = this.characterToGuess[0]
      },
      checkAnswer: function()
      {
        this.isAnswerCorrect = true
        if(this.charactersLinesList[this.charactersLinesList.length - 1].id == this.characterToGuess.id) this.isCharacterSame = true;
        else this.isCharacterSame = false
        console.log(this.characterToGuess)
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
  flex-direction: column-reverse;
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
