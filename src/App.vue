<script setup>
import CharacterLine from './components/CharacterLine.vue'
import {getRaces} from '@/services/api/opAPI.js'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <div id="guesser">
        <input v-on:keyup.enter="sendCharacter()" type="search" class="input" v-model="search" placeholder="Enter Character">
        <button @click="sendCharacter()">Send</button>
      </div>
      <div class="characters">
        <CharacterLine :characterAttributes="characterToGuessData"/>
        <CharacterLine :characterAttributes="characterToTestData"/>
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

  <script>
  export default {
    name: 'App',
    components: {
      CharacterLine
      },
    data() {
      return {
        characterToGuessData: [],
        characterToTestData: [],
        charactersList: [], //will depend on the level
        search: ""
      }
    },
    created: function(){
      this.retrieveCharacterData();   
    },
    computed: {
    mainRace: function(){
      let Race = this.RacesData[0];
      return Race;
    },
  },
    methods: {
      async retrieveCharacterData() {
        this.characterToGuessData.push({"values": "Nico Robin", "image": "https://static.printler.com/cache/8/9/d/7/2/a/89d72a714be71411cb521f59c86111d13eee5bf5.jpg"});
        this.characterToGuessData.push({"values": ["Baroque Works", "Chapeau de paille"], "image": ""});
        this.characterToGuessData.push({"values": "1,80m", "image": ""});  

        this.characterToTestData.push({"values": "Nami", "image": "https://i.pinimg.com/736x/cd/a9/8e/cda98e75fc1ae5a9d46fa065599c5850.jpg"});
        this.characterToTestData.push({"values": ["Chapeau de paille"], "image": ""});
        this.characterToTestData.push({"values": "1,70m", "image": ""});  

        this.charactersList = ["Nico Robin", "Nami", "Monkey D Luffy", "Roronoa Zoro", "Sanji Vinsmoke", "Jinbei", "Franky", "Brook", "Chopper", "Usopp"]

        console.log(await getRaces()['<property_name>'])
      },

      sendCharacter: function () {
        window.scroll(0,0);
        console.log("search :", this.search)
        this.$emit("searchRecipe", this.search)
      }

    }
  }
</script>

<style scoped>

.characters{
  display: flex;
  flex-direction: column;
}

header {
  line-height: 1.5;
  max-height: 100vh;
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
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
