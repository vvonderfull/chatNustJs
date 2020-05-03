<template>
  <h1>
    CHAT {{ user.name }}
  </h1>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "chat.vue",
    middleware: ['chat'],
    head() {
      return {
        title: `Комната ${this.user.room}`
      }
    },
    computed: mapState(['user'])
  }
</script>

<style scoped>

</style>
