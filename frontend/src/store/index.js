import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@/Auth';
import fetch from '@/fetch';

import boards from '@/store/modules/boards';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    boards,
  },
  state: {
    user: null,
    isAuthenticated: Auth.isUserAuthenticated(),
  },
  getters: {
    user: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
  },
  mutations: {
    USER_AUTHENTICATE(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
  },
  actions: {
    getProfile({ commit }) {
      return fetch('/profile')
        .then(response => response.json())
        .then(({ user }) => {
          commit('USER_AUTHENTICATE', user);
          return user;
        })
        .catch((err) => {
          throw err;
        });
    },
    register({ commit }, payload) {
      return fetch('/register', {
        hasToken: false,
        method: 'POST',
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(({ user, token }) => {
          commit('USER_AUTHENTICATE', user);
          Auth.authenticateUser(token);
          return { user, token };
        })
        .catch((err) => {
          throw err;
        });
    },
    login({ commit }, payload) {
      return fetch('/login', {
        hasToken: false,
        method: 'POST',
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(({ user, token }) => {
          commit('USER_AUTHENTICATE', user);
          Auth.authenticateUser(token);
          return { user, token };
        })
        .catch((err) => {
          throw err;
        });
    },
  },
});
