// src/store/index.js
import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      user: null
      // other state properties
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
    // other mutations
  },
  actions: {
    // your actions
  },
  getters: {
    // your getters
  }
})