<template>
  <v-flex xs12>
    <v-text-field label="Введите сообщение" outlined v-model="textMessage" @keydown.enter="sendMessage">
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
        this.$socket.emit('createMessage', {
          text: this.textMessage,
          id: this.$store.state.user.id
        }, data => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            console.log(document.getElementById('send-message'))
            document.getElementById('send-message').play()
            this.textMessage = ''
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
