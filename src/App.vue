<script setup>
import CharacterLine from './components/CharacterLine.vue'
import {getRaces} from '@/services/api/opAPI.js'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <div class="characters">
        <CharacterLine/>
        <CharacterLine/>
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
        RacesData: [],
      }
    },
    created: function(){
      this.retrieveRacesData();
    },
    computed: {
    mainRace: function(){
      let Race = this.RacesData[0];
      return Race;
    },
  },
    methods: {
      async retrieveRacesData() {
          this.RacesData = await getRaces();
          console.log(this.RacesData['<property_name>'])
          // console.log(this.RacesData[hydra:member])
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
