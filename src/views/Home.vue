<template>
    <div class="home" :class="{'home--register': !isLogin}">
        <main class="main">
            <h1 class="header"
                :class="{'header--register': !isLogin}">{{ header }}</h1>
            <form class="form" :class="{'form--register': !isLogin}">
                <label>
                    <div class="form__label form__label--first">Username</div>
                    <input class="form__input" type="text" v-model="user.username">
                </label>
                <label>
                    <div class="form__label">Password</div>
                    <input class="form__input" type="password" v-model="user.password">
                </label>
                <label v-if="!isLogin">
                    <div class="form__label">Confirm Password</div>
                    <input class="form__input" type="password" v-model="user.confirmPassword">
                </label>
                <div class="form__submit" @click="submit">{{ header }}</div>
                <a class="form__submit form__submit--google"
                   :class="{'form__submit--dark': !isLogin}"
                   :href="googleUrl">
                    <div class="form__icon-container">
                        <img class="form__google" :src="googleIcon"/>
                    </div>
                    Sign in with Google
                </a>
                <div class="form__transform" :class="{'form__transform--register': !isLogin}">
                    {{ transformText }}
                    <span class="form__transform-button"
                          @click="changeForm">{{ transformButton }}</span>
                </div>
            </form>
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { login, register } from '@/service/api';
import BASE_URL from '@/service/config';

const google = require('../assets/images/google.png');

@Component
export default class Home extends Vue {
    baseUrl = BASE_URL;

    isLogin = true;

    googleIcon = google;

    user = {
        username: '',
        password: '',
        confirmPassword: '',
    };

    get header() {
        return this.isLogin ? 'Log in' : 'Sign up';
    }

    get transformText() {
        return this.isLogin ? 'Don\' have an account?' : 'Have an account?';
    }

    get transformButton() {
        return this.isLogin ? 'Sign up' : 'Log in';
    }

    get googleUrl() {
        return `${this.baseUrl}/login/google`;
    }

    changeForm() {
        this.isLogin = !this.isLogin;
    }

    submit() {
        if (this.isLogin) {
            this.submitLogin();
        } else {
            this.submitRegister();
        }
    }

    async submitRegister() {
        if (this.user.confirmPassword === '') {
            alert('Please confirm your password!');
        } else if (this.user.confirmPassword !== this.user.password) {
            alert('Inconsistent password!');
        } else {
            const { data } = await register(this.user.username, this.user.password);
            if (data.status === 200) {
                alert('Success! Please log in again.');
            } else {
                alert(data.msg);
            }
        }
    }

    async submitLogin() {
        if (this.user.username === '' || this.user.password === '') {
            alert('Username or password cannot be empty!');
            return;
        }
        try {
            const { data } = await login(this.user.username, this.user.password);
            if (data.status === 200) {
                this.$router.push('/dashboard');
            } else {
                alert(data.msg);
            }
        } catch (e) {
            alert('Incorrect username / password!');
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/scss/main";

    .home {
        width: 100vw;
        min-height: 100vh;
        background-color: $white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .home--register {
        background-color: $light-green;
    }

    .main {
        transform: translateY(-20%);
    }

    .header {
        color: $light-green;
        font-size: 3rem;
    }

    .header--register {
        color: $white;
    }

    .form {
        padding: 30px;
        border-radius: 5px;
        background-color: $light-green;
    }

    .form--register {
        background-color: $white;
    }

    .form__label {
        margin-top: 20px;
        font-size: 18px;
        color: $dark-green;
    }

    .form__label--first {
        margin-top: 0;
    }

    .form__input {
        font-size: 18px;
        color: $dark-green;
        padding: 5px;
        min-width: 300px;
        border: 1px solid $dark-green;
        border-radius: 5px;
        outline: none;
    }

    .form__submit {
        @include button;
        position: relative;
        background-color: $dark-green;
        color: $white;
        margin-top: 40px;
        min-width: 300px;
        overflow: hidden;
    }

    .form__submit--google {
        margin-top: 20px;
        height: 43px;
        font-size: 18px;
        text-decoration: none;
        font-family: 'Roboto', sans-serif;
        background-color: white;
        color: gray;
    }

    .form__submit--dark {
        background-color: #4285f4;
        color: white;
    }

    .form__google {
        background-color: white;
        width: 25px;
        height: 25px;
    }

    .form__transform {
        margin-top: 15px;
        font-weight: bold;
        color: $white;
    }

    .form__transform--register {
        color: $dark-green;
    }

    .form__transform-button {
        color: #409eff;
        cursor: pointer;
    }

    .form__icon-container {
        width: 43px;
        height: 43px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
    }
</style>
