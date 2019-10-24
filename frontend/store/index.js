import Cookies from 'js-cookie'
import board from '~/store/modules/board'
import boards from '~/store/modules/boards'

export default {
  state () {
    return {
      authenticated: false,
      user: null,
      token: null
    }
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    authenticated: state => state.authenticated
  },
  mutations: {
    authenticate (state, { authenticated, user, token }) {
      state.authenticated = authenticated
      state.user = user
      state.token = token
    },
    setToken (state, token) {
      state.token = token
    }
  },
  actions: {
    fetchUser ({ commit, state }) {
      return this.$axios.$get('/profile/')
        .then(({ user }) => {
          commit('authenticate', { authenticated: true, user, token: state.token })
        })
        .catch(() => {})
    },
    register ({ commit }, payload) {
      return fetch('/register', {
        hasToken: false,
        method: 'POST',
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(({ user, token }) => {
          commit('USER_AUTHENTICATE', user)
          // Auth.authenticateUser(token)
          return { user, token }
        })
        .catch((err) => {
          throw err
        })
    },
    login ({ commit }, payload) {
      return this.$axios.$post('/login', payload)
        .then(({ user, token }) => {
          commit('authenticate', { authenticated: true, user, token })
          Cookies.set('token', token)
          return { user, token }
        })
        .catch((err) => {
          throw err
        })
    }
  },
  modules: {
    board,
    boards
  }
}
