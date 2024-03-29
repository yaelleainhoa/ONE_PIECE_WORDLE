<script setup>

import CharacterLine from '@/components/CharacterLine.vue'
import ResearchCharacter from '@/components/ResearchCharacter.vue'
import ChooseDifficulty from '@/components/ChooseDifficulty.vue'
import ChooseAttributes from '@/components/ChooseAttributes.vue'
import Header from '@/components/Header.vue'
import Rules from '@/components/Rules.vue'
import CorrectAnswer from '@/components/CorrectAnswer.vue'
import ShowClue from '@/components/ShowClue.vue'
import {setRandomCharacterToGuess, getCharacterAttributesById, setAttributes} from '@/services/api/opAPI.js'
import IconButton from '@/components/IconButton.vue'
import replay from '../assets/replay.png'
import giveup from '../assets/giveup.png'

</script>

<template>
  <div class="options shadowElement" ref="options">
    <ChooseAttributes :attributesList="attributesFullNameList" :disabled="loading"></ChooseAttributes>
    <ChooseDifficulty class="option" v-on:selectDifficulty="selectDifficulty"></ChooseDifficulty>
    <IconButton value="New character" :image="replay" class="option" @click="setRandomCharacter" :disabled="loading"></IconButton>
    <ShowClue class="option" :clue="characterToGuess.clue" :disabled="loading"></ShowClue>
    <IconButton value="Give up round" :image="giveup" class="option" @click="showAnswer" :disabled="loading"></IconButton>
  </div>

  <Rules></Rules>

  <ResearchCharacter class="shadowElement" :reset="reset" :loading="loading" v-on:selectCharacter="addCharacter" id="guesser"></ResearchCharacter>
  <CorrectAnswer class="shadowElement" v-if="showingAnswer" :image="characterToGuess.image" :names="characterToGuess.names" :isCharacterSame="isCharacterSame" :isAnswerCorrect="isAnswerCorrect"></CorrectAnswer>
  
  <div class="guessesGame">
    <div v-if="ready" class="attributesList">
      <div class="flex">
        <div class="attributeName" v-for="(attribute, index) in attributesFullNameList" :key="index" v-show="index == 0 || !attributesFullNameList[index-1].hidden"> 
          <div v-if="attribute.all_possibilities" v-bind:title="attribute.all_possibilities[1]" @click="seeAllPossibilities(attribute.all_possibilities[0])" class="information">
          <!-- <div v-if="attribute.all_possibilities" v-bind:title="attribute.all_possibilities" class="information"> -->
            <img src="../assets/info.png">
            <span ref="spanInfo" class="tooltip" style="display: none;"> {{ attribute.all_possibilities[1] }} </span>
          </div>
          <p v-bind:title="attribute.all_possibilities">{{ attribute.full_name }}</p>
        </div>
      </div>
      <div class="flex">
        <div v-for="(attribute, index) in attributesFullNameList" v-show="index == 0 || !attributesFullNameList[index-1].hidden"> 
          <div class="separator"></div>
        </div>
      </div>
    </div>

    <div class="characters">
      <CharacterLine v-on:checkAnswer="checkAnswer" v-for="character in charactersLinesList" :characterAttributes=character :attributesList=attributesFullNameList></CharacterLine>
    </div>
  </div>

  <RouterView />
</template>

  <script>
  export default {
    name: 'Home',
    components: {
      CharacterLine,
      ResearchCharacter,
      ChooseDifficulty,
      ChooseAttributes,
      Header,
      CorrectAnswer,
      IconButton,
      Rules
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
        attributesFullNameList : [],
        reset:false,
        ready: false,
        hiddenAttributes : []
      }
    },
    created: async function(){
      this.setRandomCharacter();
      this.attributesFullNameList = await setAttributes();
      this.ready = true;
    },
    computed: {
      mainCharacter: function(){
        let Character = this.CharactersData[0];
        return Character;
      }
    },
    mounted(){
      this.setZIndexOptions();
    },
    methods: {
      addCharacter: async function(id)
      {
        this.loading = true
        this.reset = false
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
        this.reset = true
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
      },
      setZIndexOptions: function()
      {
          const optionsChildren = Array.from(this.$refs.options.children);
          optionsChildren.forEach((child, index) => {
          child.style.zIndex = 5 + optionsChildren.length - index;
        });
      },
      seeAllPossibilities: function(index)
      {
        const allPossibilities = this.$refs.spanInfo[index];
        if(allPossibilities){
          allPossibilities.style.display = 'inline';
          setTimeout(() => {
            allPossibilities.style.display = 'none';
          }, 3000)
        }
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
  margin: 4px;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: var(--fontsize);
  flex-direction: column;
  justify-content: flex-end;
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
  margin: 4px;
}

.flex{
  display: flex;
  width: fit-content;
}

.options{
  display: flex;
  justify-content: center;
  margin: auto;
  z-index: 10;
}

.option{
    margin: 10px;
  }

.information:hover{
  cursor: pointer;
}

.information{
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
}

.information img{
  width: 100%;
}

.guessesGame
{
  overflow: auto;
  margin:auto;
  max-width: 90vw;
  padding-bottom: 10px;
}

@media (max-width: 1024px) {

  .options{
    flex-direction: column;;
  }

  button{
    width: var(--button-width);
  }
}
</style>
