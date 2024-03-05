<script setup>

import CharacterLine from '@/components/CharacterLine.vue'
import ResearchCharacter from '@/components/ResearchCharacter.vue'
import ChooseDifficulty from '@/components/ChooseDifficulty.vue'
import Header from '@/components/Header.vue'
import CorrectAnswer from '@/components/CorrectAnswer.vue'
import {setRandomCharacterToGuess, getCharacterAttributesById, attributesList} from '@/services/api/opAPI.js'

</script>

<template>
  <Header>
  </Header>
  <div class="options">
    <ChooseDifficulty v-on:selectDifficulty="selectDifficulty"></ChooseDifficulty>
    <button @click="setRandomCharacter" :disabled="loading">Play again</button>
    <button @click="showAnswer" :disabled="loading">Give up</button>
  </div>

  <ResearchCharacter :loading="loading" v-on:selectCharacter="addCharacter" id="guesser"></ResearchCharacter>
  <CorrectAnswer v-if="showingAnswer" :image="characterToGuess.image" :names="characterToGuess.names" :isCharacterSame="isCharacterSame" :isAnswerCorrect="isAnswerCorrect"></CorrectAnswer>
  <div class="attributesList">
    <div class="flex">
      <div class="attributeName" v-for="attribute in attributesFullNameList"> 
        <p>{{ attribute.full_name }}</p>
      </div>
    </div>
    <div class="flex">
      <div v-for="attribute in attributesFullNameList"> 
        <div class="separator"></div>
      </div>
    </div>

  </div>
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
        isCharacterSame :false,
        showingAnswer: false,
        loading: false,
        attributesFullNameList : attributesList
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
        this.loading = true
        let characterAttributes = await getCharacterAttributesById(id)
        this.charactersLinesList.push(characterAttributes)
        this.loading = false
      },
      selectDifficulty: function(difficulty)
      {
        this.currentDifficulty=difficulty;
        this.setRandomCharacter()
      },
      setRandomCharacter: async function()
      {
        this.charactersLinesList = [];
        this.showingAnswer = false
        this.isAnswerCorrect = false;
        this.isCharacterSame = false
        this.loading = true
        this.characterToGuess = await setRandomCharacterToGuess(this.currentDifficulty)
        this.loading = false
      },
      showAnswer: function()
      {
        if(this.charactersLinesList.length != 0 && this.charactersLinesList[this.charactersLinesList.length - 1][0].id == this.characterToGuess.id) this.isCharacterSame = true;
        else this.isCharacterSame = false
        this.showingAnswer = true;
      },
      checkAnswer: function()
      {
        this.isAnswerCorrect = true
        this.showAnswer()
      }

    }
  }
</script>

<style scoped>

.characters{
  display: flex;
  flex-direction: column-reverse;
  margin: auto;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.attributesList{
  display: flex;
  margin: auto;
  flex-direction: column;
}

.attributeName{
  width: var(--case-width);
  margin: 2px;
  display: flex;
  align-items: center;
  text-align: center;
}

.attributeName p{
  width:100%;
}

.separator{
  content:"";
  width : 100%;
  height:2px;
  background-color: white;
  width: var(--case-width);
  margin: 2px;
}

.flex{
  display: flex;
}

.options{
  display: flex;
  justify-content: center;
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
