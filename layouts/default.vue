<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer" mobile-break-point="700">
      <v-list subheader>
        <v-subheader>Люди в комнате</v-subheader>

        <v-list-item
          v-for="u in users"
          :key="u.id"
          @click.prevent
        >
          <v-list-item-content>
            <v-list-item-title>{{u.name}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.id === 2 ? 'primary' : 'grey'">mdi-message</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" style="margin-left: -8px;"></v-app-bar-nav-icon>
      <v-toolbar-title>Чат комнаты {{user.room}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="closeChat" style="margin-right: -8px;">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <div style="height: 100%">
        <nuxt/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        drawer: true,
        users: [
          {
            id: 1,
            name: 'Ivan'
          },
          {
            id: 2,
            name: 'Igor'
          },
          {
            id: 3,
            name: 'Sergey'
          }
        ]
      }
    },
    computed: mapState(['user']),
    methods: {
      ...mapMutations(['clearUser']),
      closeChat() {
        this.$router.push('/?message=closeChat');
        this.clearUser();
      }
    }
  }
</script>
