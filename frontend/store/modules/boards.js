export default {
  namespaced: true,
  state () {
    return {
      fetched: false,
      boards: []
    }
  },
  getters: {
    fetched: state => state.fetched,
    boards: state => state.boards
  },
  mutations: {
    fetch (state, boards) {
      state.boards = boards
      state.fetched = true
    },
    clear (state) {
      state.boards = []
      state.fetched = false
    },
    create (state, board) {
      state.boards.push(board)
    },
    remove (state, id) {
      state.boards = state.boards.filter(board => board.id !== id)
    }
  },
  actions: {
    fetch ({ commit }) {
      return this.$axios.$get('/boards/')
        .then(({ boards }) => {
          commit('fetch', boards)
          return boards
        })
        .catch((error) => {
          throw error
        })
    },
    clear ({ commit }) {
      commit('clear')
    },
    create ({ commit }, form) {
      return this.$axios.$post('/boards/', form)
        .then(({ board }) => {
          commit('create', board)
          return board
        })
        .catch((error) => {
          throw error
        })
    },
    remove ({ commit }, id) {
      return this.$axios.$delete(`/boards/${id}/`)
        .then(() => commit('remove', id))
        .catch((error) => {
          throw error
        })
    }
  }
}
