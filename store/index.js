export const state = () => ({
  user: {},
  messages: [],
  users: [],
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  clearUser(state) {
    state.user = {}
    state.messages = []
    state.users = []
  },
  muteUsers(state, index) {
    if (state.users[index].id !== state.user.id) {
      state.users[index].mute = !state.users[index].mute
    }
  },
  SOCKET_newMessage(state, message) {
   if (state.users.find(user => user.id === message.id).mute === false) {
     if (message.name !== 'admin' && message.name !== state.user.name) {
       new Audio('https://s3-ap-northeast-1.amazonaws.com/poodll-audioprocessing-out/CP/30/localhostuser/recordmp3online.com/poodll/poodllfile5ed645af551a21.mp3').play()
     }
   }
    state.messages.push(message)
  },
  SOCKET_updateUsers(state, users) {
    state.users = users
  }
}

export const actions = {
  SOCKET_newMessage(ctx, data) {
    console.log('message', data)
  }
}
