<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
    >
      <v-card min-width="500" min-height="320" style="background-color: rgba(0,0,0,0.3); margin-top: 50px">

        <v-snackbar
          v-model="snackbar"
          top
          right
          :timeout="3000"
        >
          {{ message }}
          <v-btn
            color="pink"
            text
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>

        <v-card-title>
          <h2>
            Real Time Chat
          </h2>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            style="margin-top: 30px;"
          >
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Введите ваше имя"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Введите название комнаты"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="goChat"
              style="margin-top: 30px;"
            >
              Присоединиться
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
  import {mapMutations} from 'vuex'

  export default {
    layout: 'empty',
    head: {
      title: 'Пообщаемся?'
    },
    sockets: {
      connect() {
        console.log('Client connect')
      }
    },
    data: () => ({
      valid: true,
      name: '',
      message: '',
      snackbar: false,
      nameRules: [
        v => !!v || 'Введите имя!',
        v => (v && v.length <= 16) || 'Имя не должно быть больше 16 символов!',
      ],
      room: '',
      roomRules: [
        v => !!v || 'Введите комнату!'
      ],
    }),
    mounted() {
      const {message} = this.$route.query
      if (message === 'noUser') {
        this.message = 'Для начала нужно Авторизоваться!'
      } else if (message === 'closeChat') {
        this.message = 'Вы вышли из чата!'
      }

      this.snackbar = !!this.message
    },
    methods: {
      ...mapMutations(['setUser']),
      goChat() {
        if (this.$refs.form.validate()) {
          let user = {
            name: this.name,
            room: this.room
          }

          this.$socket.emit('userJoined', user, data => {
            if (typeof data === 'string') {
              console.error(data)
            } else {

              user.id = data.userId;
              this.setUser(user);
              this.$router.push('/chat');
            }
          })
        }
      },
    },
  }
</script>
