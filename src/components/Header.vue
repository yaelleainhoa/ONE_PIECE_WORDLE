<script setup>

</script>

<template>
    <div id="header" class="shadowElement">
        <img @click="returnHome" alt="Logo home page" src="../assets/logo.png" />
    </div>
</template>

  <script>
  export default {
    name: 'Header',
    data() {
      return {
      }
    },
    methods: {
        returnHome()
        {
            return this.$router.push("/")
        }
    }
    }
</script>

<style scoped>

#header
{
    height:var(--header-height);
    width:fit-content;
    margin: 30px auto;
    transition: transform 0.2s ease-in-out;
}

#header:hover{
    cursor:pointer;
    transform: scale(1.1);
}

img{
    height:100%
}


@media (min-width: 1024px) {

}
</style>
