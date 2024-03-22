<script setup>

import IconButton from '@/components/IconButton.vue'
import icon from '../assets/difficulty.png'

defineProps({
  attributesList: {
    default: [],
    type: Array
  }
})

</script>

<template>
    <div class="chooseAttributes">
        <IconButton value="Hide attributes" :image="icon" @click="changeAttributes" :class="[choosing ? 'bottomWindow' : '']"></IconButton>
        <div multiple name="levels" tabindex="0" @blur="handleBlur" class="options" :class="[choosing ? '' : 'invisible']">
            <option class="option" @click="chooseAttribute(index)" v-for="(attribute, index) in attributesList.slice(1)"  > 
                <input type="checkbox" :id=index name="my-checkbox" id="opt-in" checked />
                {{ attribute.full_name }} 
            </option>
        </div>
    </div>

</template>

  <script>
  export default {
    name: 'ChooseAttributes',
    components: {
      IconButton,
    },
    emits :{
      selectAttributes: null,
    },
    data() {
      return {
        choosing:false
      }
    },
    created: function(){
    },
    computed: {
  },
    methods: {
        changeAttributes()
        {
            this.choosing=!this.choosing;
        },
        chooseAttribute(index)
        {
            document.getElementById(index).checked = !document.getElementById(index).checked;
            this.attributesList[index].hidden = !document.getElementById(index).checked;
        },     
        chooseAttributes()
        {
            this.changeAttributes()
            // this.$emit("selectAttributes", this.attributesList)
            console.log("attributes:",this.attributesList)
        },
        handleBlur: function(){
            console.log("blur")
            this.chooseAttributes()
        },
    }
  }
</script>

<style scoped>

.chooseAttributes{
  position: relative;
  display: inline-block;
  border-top-left-radius: 5px 5px;
  border-top-right-radius: 5px 5px;
  margin:10px;
}

.options{
  position: absolute;
  background-color: var(--list-color);
  width: var(--button-width);
  animation: appear 0.8s ease-in-out;
}

.option:hover{
    cursor:pointer;
    background-color: var(--list-hover);
}

.option{
    display: flex;
}

.option > *{
    margin: 0px 10px;
}

button{
  margin-bottom: 0;
  margin-left: 0;
}

@media (min-width: 1024px) {

}
</style>
