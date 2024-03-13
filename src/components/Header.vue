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
    height:200px;
}

#header:hover{
    cursor:pointer
}

img{
    height:100%
}

@media (min-width: 1024px) {

}
</style>
