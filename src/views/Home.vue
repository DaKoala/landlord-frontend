<template>
    <div class="home" :class="{'home--register': !isLogin}">
        <main class="main">
            <h1 class="header"
                :class="{'header--register': !isLogin}"
                @click="changeForm">{{ header }}</h1>
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
            </form>
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { login, register } from '@/service/api';

@Component
export default class Home extends Vue {
    isLogin = true;

    user = {
        username: '',
        password: '',
        confirmPassword: '',
    };

    get header() {
        return this.isLogin ? 'Login' : 'Register';
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
        const { data } = await login(this.user.username, this.user.password);
        if (data.status === 200) {
            alert('Authorized!');
        } else {
            alert(data.msg);
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
        cursor: pointer;
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
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: $dark-green;
        color: $white;
        font-weight: bold;
        font-size: 24px;
        border-radius: 5px;
        margin-top: 40px;
        padding: 5px 0;
        min-width: 300px;
    }
</style>
