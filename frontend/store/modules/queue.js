export default {
  namespaced: true,
  state () {
    return {
      queue: []
    }
  },
  getters: {
    queue: state => state.queue
  },
  mutations: {
    add (state, item) {
      state.queue.push(item)
    },
    update (state, { id, progress }) {
      state.queue = state.queue.map((i) => {
        const item = i
        if (item.id === id) {
          item.progress = progress
        }
        return item
      })
    },
    clear (state) {
      state.queue = []
    }
  },
  actions: {}
}
