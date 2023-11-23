import api from '@crex/api/properties';
import { EventBus } from '@crex/events/EventBus';
import _ from 'underscore';

const state = {
  properties: [],
  subjectProperty: {},
  comparisonProperty: {},
  date_from: '',
  date_to: '',
  sold_from: 0,
  sold_to: 0,
  zip_code: ''
};

// getters
const getters = {};

// mutations
const mutations = {
  initialise(state, session) {
    state.properties = session.properties ?? [];
    state.subjectProperty = session.subjectProperty ?? {};
    state.comparisonProperty = session.comparisonProperty ?? {};
    state.date_from = session.date_from ?? '';
    state.date_to = session.date_to ?? '';
    state.sold_from = session.sold_from ?? 0;
    state.sold_to = session.sold_to ?? 0;
    state.zip_code = session.zip_code ?? '';
  },
  setProperties(state, properties) {
    state.properties = properties;
  },
  selectProperty(state, property) {
    if(!state.subjectProperty.hasOwnProperty('id')) {
      state.subjectProperty = property;
    } else if(!state.comparisonProperty.hasOwnProperty('id')) {
        state.comparisonProperty = property;
    }
  },
  clearSubjectProperty(state) {
    state.subjectProperty = {};
  },
  clearComparisonProperty(state) {
    state.comparisonProperty = {};
  },
  setDateFrom(state, date) {
    state.date_from = date;
  },
  setDateTo(state, date) {
    state.date_to = date;
  },
  setSoldFrom(state, amount) {
    state.sold_from = amount;
  },
  setSoldTo(state, amount) {
    state.sold_to = amount;
  },
  setZipCode(state, code) {
    state.zip_code = code;
  }
};

// actions
const actions = {
    initialise({ state, commit }, data) {
      commit('initialise', data);
    },
    get({ state, commit }, cb) {
        api.get(
            state.date_from,
            state.date_to,
            state.sold_from,
            state.sold_to,
            state.zip_code,
            (success) => {
              commit('setProperties', success.data);

              if(cb) {
                cb();
              }
            },
            (err) => {
              EventBus.$emit('showNotification', {
                title: 'Could not get properties',
                description: 'Please try again',
                success: false
              })
            }
        );
    },
    selectProperty({ commit }, property) {
      commit('selectProperty', property);
    },
    clearSubjectProperty({ commit }) {
      commit('clearSubjectProperty');
    },
    clearComparisonProperty({ commit }) {
      commit('clearComparisonProperty');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
