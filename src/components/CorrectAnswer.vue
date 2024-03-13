<script setup>


defineProps({
    image: {
        default: "",
        type: String
    },
    names:{
        default : [],
        type: Array
    },
    isCharacterSame:
    {
        default:false,
    },
    isAnswerCorrect:
    {
        default: false
    }
})
</script>

<template>
    <div class="correctAnswer" :class="[isAnswerCorrect == true ? 'correct' : 'false']">
        <p>{{ endgameText }}</p>
        <div class="image">
            <img alt="Correct character" v-bind:src=image>
        </div>
        <h2>{{characterName }}</h2>
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
            GaveUp: "Too bad... The character we had in mind was"
        },
        endgameText : "",
        characterName : ""
    }
  },
  created: function()
  {
    this.endgameText = this.isAnswerCorrect ? this.isCharacterSame ? this.AnswerEnum.SameCharacter : this.AnswerEnum.SameAttributes : this.AnswerEnum.GaveUp
    if(Array.isArray(this.names)){
        this.characterName = this.names.join(", ");
      }
      else{
        this.characterName=this.names;
      }
  },
}
</script>

<style scoped>

.correctAnswer{
    display: flex;
    flex-direction: column;
    align-items: center;
    width:fit-content;
    margin:20px auto;
    /* border:solid; */
    border-radius: 5px;
    animation: appear 1s ease-in-out;
    z-index: -1;
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
    padding:10px;
}

</style>
