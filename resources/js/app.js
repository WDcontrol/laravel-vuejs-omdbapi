import Vuetify from 'vuetify'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
import Vuelidate from 'vuelidate'
import { sync } from 'vuex-router-sync'
import router from "./router";
import store from "./store";

require('./bootstrap');

window.Vue = require('vue');

Vue.use(require('vue-chartist'));
Vue.component('date-picker', VuePersianDatetimePicker);

Vue.use(Vuelidate);
Vue.use(Vuetify, {
    theme: {
        primary: '#b71c1c',
        success: '#4CAF50'
    }
});
Vue.component('app', require('./index.vue').default);

sync(store, router);

const app = new Vue({
    router,
    store,
    el: '#app',
});

