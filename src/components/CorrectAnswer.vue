<script setup>


defineProps({
    image: {
        default: "",
        type: String
    },
    name:{
        default : [],
        type: Array
    },
    isCharacterSame:
    {
        default:false,
    }
})
</script>

<template>
    <div class="correctAnswer">
        <p>{{ victoryText }}</p>
        <div class="image">
            <img alt="Correct character" v-bind:src=image>
        </div>
        <h2>{{ name }}</h2>
    </div>
</template>

<script>
export default {
  name: 'GoodAnswer',
  data() {
    return {
        AnswerEnum : {
            SameAttributes : "Good guess!! You found a good character, but the one we had in mind was",
            SameCharacter : 'Good guess!! You found the good character',
        },
        victoryText : ""
    }
  },
  created: function()
  {
    this.victoryText = this.isCharacterSame ? this.AnswerEnum.SameCharacter : this.AnswerEnum.SameAttributes
    console.log("img =",this.image)
  },
  methods:
  {
  },
}
</script>

<style scoped>

.correctAnswer{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--color-true);
    width:fit-content;
    margin:40px auto;
    border:solid;
    border-radius: 5px;
}

.image{
    height:180px;
    width:fit-content;
    overflow: hidden;
}

img{
    height: 110%;
}

p{
    padding:20px;
}

h2{
    padding:30px;
}

</style>
