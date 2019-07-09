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
    actions: {
        fetch({ state }) {
            return fetch('/boards/')
                .then(response => response.json())
                .then(({ boards }) => {
                    state.boards = boards;
                    state.fetched = true;
                })
                .catch((error) => {
                    throw error;
                });
        },
        clear({ state }) {
            state.boards = [];
            state.fetched = false;
        },
        remove({ state }, id) {
            return this.$fetch(`/boards/${id}/`, { method: 'DELETE' })
                .then(() => {
                    state.boards = state.boards.filter(board => board.id !== id);
                })
                .catch((error) => {
                    throw error;
                });
        }
    },
}