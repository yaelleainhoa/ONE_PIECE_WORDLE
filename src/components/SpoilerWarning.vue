<script setup>

import Panel from '@/components/Panel.vue'

</script>

<template>
    <Panel title="SPOILER WARNING" :message=warning warning="true"></Panel>
</template>

<script>
export default {
  name: 'SpoilerWarning',
  components: {
      Panel
      },
  data() {
    return {
        warning:["You shouldn't play this game if you're not up to date with the manga..."],
    }
  },
}
</script>

<style scoped>

</style>
