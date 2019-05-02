import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { me } from '@/service/api';

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

router.beforeEach(async (to: any, from: any, next: any) => {
    let authorized = false;
    try {
        const { data } = await me();
        authorized = data.status === 200;
    } catch (e) {
        authorized = false;
    }
    if (authorized && to.path === '/') {
        next('/dashboard');
        document.title = 'Dashboard';
    } else if (!authorized && to.path !== '/') {
        next('/');
        document.title = 'Fight The Landlord';
    } else {
        next();
        document.title = to.meta.title;
    }
});

export default router;
