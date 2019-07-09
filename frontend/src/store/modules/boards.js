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
        create(state, board) {
            state.boards.push(board);
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
        add({ commit }, form) {
            return fetch(`/boards/`, { method: 'POST', body: JSON.stringify(form) })
                .then(response => response.json())
                .then(({ board }) => commit('add', board))
                .catch((error) => {
                    throw error;
                });
        },
        remove({ commit }, id) {
            return fetch(`/boards/${id}/`, { method: 'DELETE' })
                .then(() => commit('remove', id))
                .catch((error) => {
                    throw error;
                });
        },
    },
}