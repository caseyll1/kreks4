import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

Vue.use(VueRouter);

Vue.config.devtools = true;
Vue.config.debug = true;
Vue.config.silent = false;

import MainShell from "./views/layouts/MainShell.vue";
Vue.component("main-shell", MainShell);

import DefaultLayout from "./views/layouts/DefaultLayout.vue";
Vue.component("default-layout", DefaultLayout);

import router from './routes/routes';

global.vm = new Vue({
    el: '#crex',
    store,
    router
});
