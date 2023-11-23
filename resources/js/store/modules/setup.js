import {EventBus} from "../../events/EventBus";

const SESSION_STORAGE = 'crex';

const state = {
  initialised: false,
  env: document.currentScript.getAttribute('env')
};

const getters = {
  env: (state) => {
      return state.env ?? 'production';
  }
};

const mutations = {
    initialiseFromSession(state, session) {
        try {
            EventBus.$emit('store-initialised');
            this.dispatch('properties/initialise', session.properties);
            state.initialised = true;
        } catch(err) {
            console.log('Error initialising from session');
            console.error(err);
        }
    },
    initialise(state) {
        EventBus.$emit('store-initialised');
        state.initialised = true;
    }
};

const actions = {
    initialise({commit}) {
        let session = localStorage.getItem(SESSION_STORAGE);
        if(session) {
          commit('initialiseFromSession', JSON.parse(session));
        } else {
          commit('initialise');
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
