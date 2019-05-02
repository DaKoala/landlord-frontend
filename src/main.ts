import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BASE_URL from './service/config';
import { ajax } from './service/ajax';

Vue.config.productionTip = false;

declare module 'vue/types/vue' {
    interface Vue {
        $auth(): Promise<void>;
    }
}

Vue.prototype.$auth = async function auth() {
    try {
        const { data } = await ajax({
            url: '/me',
        });
        if (data.status === 200 && this.$route.path === '/') {
            this.$router.redirect('/dashboard');
        } else if (this.status !== 200) {
            this.$router.redirect('/');
        }
    } catch (e) {
        if (this.$route.path !== '/') {
            this.$router.redirect('/');
        }
    }
};

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
