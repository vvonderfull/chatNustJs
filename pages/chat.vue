<template>
  <div class="chat-background">
    <div class="chat-content" ref="block">
      <Message
        v-for="(m,index) in messages"
        :key="index"
        :name="m.name"
        :text="m.text"
        :owner="m.id === user.id"
      />
      <Message
        v-for="(m,index) in messages"
        :key="index"
        :name="m.name"
        :text="m.text"
        :owner="m.id === user.id"
      />
    </div>
    <div class="chat-form">
      <MessageForm/>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Message from "../components/Message";
  import MessageForm from "../components/MessageForm";

  export default {
    name: "chat.vue",
    components: {Message, MessageForm},
    middleware: ['chat'],
    head() {
      return {
        title: `Комната ${this.user.room}`
      }
    },
    comments: {
      Message
    },
    computed: mapState(['user', 'messages']),
    watch: {
      messages() {
        setTimeout(() => {
          this.$refs.block.scrollTop = this.$refs.block.scrollHeight
        }, 0)
      }
    }
  }
</script>

<style scoped>
  .chat-background {
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .chat-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    height: 80px;
    background-color: #212121;
  }

  .chat-content {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 80px;
    padding: 1rem;
    overflow-y: auto;

  }
</style>
