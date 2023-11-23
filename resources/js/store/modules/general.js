// initial state
import {EventBus} from '@crex/events/EventBus';

const state = {
    observer: {},
    entries: [],
    video_observer: {},
    video_entries: [],
    location: {}
};

// getters
const getters = {};

// mutations
const mutations = {
    startObserver(state) {
       let options =  {
           root: document.getElementById('#tapp'), // relative to document viewport
           rootMargin: '264px 16px', // margin around root. Values are similar to css property. Unitless values not allowed
           threshold: 0 // visible amount of item shown in relation to root
       };

       state.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    try {
                        //Visible
                        EventBus.$emit(entry.target.getAttribute('id') + '-visible', entry.target.getAttribute('id'));
                    } catch(err) {
                        console.error('Error in visible ' + err);
                    }
                } else {
                    try {
                        //Invisible
                        EventBus.$emit(entry.target.getAttribute('id') + '-invisible', {});
                    } catch(err) {
                        console.error('Error in invisible ' + err);
                    }
                }
            });
        }, options);
    },
    addEntry(state, element) {
        state.observer.observe(element);
    },
    removeEntry(state, element) {
        state.observer.unobserve(element);
    },
    stopObserver(state) {
        state.observer.disconnect();
    },
    startVideoObserver(state) {
       let options =  {
           root: document.getElementById('#tapp'), // relative to document viewport
           rootMargin: '-32px 0% -40% 0%', // margin around root. Values are similar to css property. Unitless values not allowed
           threshold: 0.8 // visible amount of item shown in relation to root
       };

       state.video_observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    try {
                        //Visible
                        EventBus.$emit(entry.target.getAttribute('id') + '-visible', entry.target.getAttribute('id'));
                    } catch(err) {
                        console.error('Error in visible ' + err);
                    }
                } else {
                    try {
                        //Invisible
                        EventBus.$emit(entry.target.getAttribute('id') + '-invisible', {});
                    } catch(err) {
                        console.error('Error in invisible ' + err);
                    }
                }
            });
        }, options);
    },
    addVideoEntry(state, element) {
        state.video_observer.observe(element);
    },
    removeVideoEntry(state, element) {
        state.video_observer.unobserve(element);
    },
    stopVideoObserver(state) {
        state.video_observer.disconnect();
    },
    setLocation(state, location) {
      state.location = location;
    }
};

// actions
const actions = {
    startObserver({commit}) {
        commit('startObserver');
    },
    addEntry({commit}, entry) {
        commit('addEntry', entry);
    },
    removeEntry({commit}, entry) {
        commit('removeEntry', entry);
    },
    stopObserver({commit}) {
        commit('stopObserver');
    },
    startVideoObserver({commit}) {
        commit('startVideoObserver');
    },
    addVideoEntry({commit}, entry) {
        commit('addVideoEntry', entry);
    },
    removeVideoEntry({commit}, entry) {
        commit('removeVideoEntry', entry);
    },
    stopVideoObserver({commit}) {
        commit('stopVideoObserver');
    },
    setLocation({ commit }, location) {
        commit('setLocation', location);
    },
    logout({dispatch}) {
        this.dispatch('filters/reset');
        this.dispatch('search/reset');
        this.dispatch('saved/reset');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
