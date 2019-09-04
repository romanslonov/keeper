import fetch from '@/fetch';

export default {
    namespaced: true,
    state: {
        fetched: false,
        board: {},
    },
    getters: {
        fetched: (state) => state.fetched,
        board: (state) => state.board,
        isCurrentUserOwner: (state, getters, rootGetters) => state.board.ownerId === rootGetters.user.id,
    },
    mutations: {
        set(state, board) {
            state.board = board;
            state.fetched = true;
        },
        clear(state) {
            state.board = {};
            state.fetched = false;
        },
    },
    actions: {
        fetch({ commit }, id) {
            return fetch(`/boards/${id}`)
                .then(response => response.json())
                .then(({ board }) => commit('set', board))
                .catch((error) => {
                    throw error;
                });
        },
        set({ commit }, board) {
            return commit('set', board)
        },
        clear({ commit }) {
            commit('clear')
        },
        share({}, { id, emails }) {
            return fetch(`/boards/${id}/share/`, { method: 'POST', body: JSON.stringify(emails) })
                .catch((error) => {
                    throw error;
                });
        },
    },
}