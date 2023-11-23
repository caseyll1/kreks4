import api from '@crex/api/filters';

const state = {};

// getters
const getters = {};

// mutations
const mutations = {};

// actions
const actions = {
    record({ commit, getters, dispatch, state, rootGetters }, data) {
      if(rootGetters['authentication/isLoggedIn']) {
        api.record(
            data.event,
            data.place ?? null,
            data.filters ?? null,
            (success) => {},
            (err) => {}
        );
      }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
