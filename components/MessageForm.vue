<template>
  <v-flex xs12>
    <v-text-field label="Введите сообщение" outlined v-model.trim="textMessage" @keydown.enter="sendMessage">
    </v-text-field>
  </v-flex>
</template>

<script>
  export default {
    data() {
      return {
        textMessage: ''
      }
    },
    methods: {
      sendMessage() {
        if(this.textMessage) {
          this.$socket.emit('createMessage', {
            text: this.textMessage,
            id: this.$store.state.user.id
          }, data => {
            if (typeof data === 'string') {
              console.error(data)
            } else {
              this.textMessage = ''
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
