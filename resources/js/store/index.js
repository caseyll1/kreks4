import Vue from 'vue';
import Vuex from 'vuex';

import setup from './modules/setup';
import general from './modules/general';
import properties from './modules/properties';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

var thisStore = new Vuex.Store({
    modules: {
        setup,
        general,
        properties
    },
    strict: debug
});

// Subscribe to store updates
thisStore.subscribe((mutation, state) => {
    if(state['setup']['initialised']) {
        localStorage.setItem('crex', JSON.stringify(state));
    }
});

export default thisStore;
