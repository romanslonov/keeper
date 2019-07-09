import fetch from '@/fetch';

export default {
    namespaced: true,
    state: {
        fetched: false,
        boards: [],
    },
    getters: {
        fetched: (state) => state.fetched,
        boards: (state) => state.boards,
    },
    mutations: {
        fetch(state, boards) {
            state.boards = boards;
            state.fetched = true;
        },
        clear(state) {
            state.boards = [];
            state.fetched = false;
        },
        remove(state, id) {
            state.boards = state.boards.filter(board => board.id !== id);
        },
    },
    actions: {
        fetch({ commit }) {
            return fetch('/boards/')
                .then(response => response.json())
                .then(({ boards }) => commit('fetch', boards))
                .catch((error) => {
                    throw error;
                });
        },
        clear({ commit }) {
            commit('clear')
        },
        remove({ commit }, id) {
            return this.$fetch(`/boards/${id}/`, { method: 'DELETE' })
                .then(() => commit('remove', id))
                .catch((error) => {
                    throw error;
                });
        }
    },
}