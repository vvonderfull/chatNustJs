export const state = () => ({
  user: {},
  messages: [],
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  clearUser(state) {
    state.user = {}
    state.messages = []
  }
}

export const actions = {
  SOCKET_newMessage(ctx, data) {
    console.log('message', data)
  }
}
