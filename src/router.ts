import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: 'Fight The Landlord',
            },
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('./views/Dashboard.vue'),
            meta: {
                title: 'Dashboard',
            },
        },
    ],
});

router.beforeEach((to: any, from: any, next: any) => {
    document.title = to.meta.title;
    next();
});

export default router;
