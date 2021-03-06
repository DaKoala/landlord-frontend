import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faUser,
    faCoins,
    faHandHoldingUsd,
    faFunnelDollar,
    faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(
    faUser,
    faCoins,
    faHandHoldingUsd,
    faFunnelDollar,
    faSyncAlt,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
