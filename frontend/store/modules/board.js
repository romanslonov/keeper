export default {
  namespaced: true,
  state () {
    return {
      fetched: false,
      board: {}
    }
  },
  getters: {
    fetched: state => state.fetched,
    board: state => state.board
    // isCurrentUserOwner: (state, getters, rootGetters) => state.board.ownerId === rootGetters.user.id
  },
  mutations: {
    set (state, board) {
      state.board = board
      state.fetched = true
    },
    clear (state) {
      state.board = {}
      state.fetched = false
    }
  },
  actions: {
    fetch ({ commit }, id) {
      return this.$axios.$get(`/boards/${id}`)
        .then(({ board }) => commit('set', board))
        .catch((error) => {
          throw error
        })
    },
    set ({ commit }, board) {
      return commit('set', board)
    },
    clear ({ commit }) {
      commit('clear')
    },
    share ({ id, emails }) {
      return this.$axios.$post(`/boards/${id}/share/`, emails)
        .catch((error) => {
          throw error
        })
    }
  }
}
