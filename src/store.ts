/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // @ts-ignore
        username: '',
        chip: 0,
    },
    mutations: {
        updateUser(state: any, payload: { username: string, chip: number }) {
            state.username = payload.username;
            state.chip = payload.chip;
        },
    },
    actions: {},
});
