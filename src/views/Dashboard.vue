<template>
    <div>
        <div class="left">
            <div class="line line--top">
                <p>
                    <span class="text--support">Welcome, </span>
                    <span class="text--main">{{ user.username }}</span>
                </p>
                <p>
                    <span class="text--support">Score: </span>
                    <span class="text--main">{{ user.score }}</span>
                </p>
            </div>
            <div class="line line--second">
                <strong class="text--main">Existing Rooms:</strong>
            </div>
            <div class="rooms">
                <div class="rooms__empty" v-if="rooms.length === 0">
                    <strong class="text--empty">There is currently no room created.</strong>
                </div>
            </div>
            <div class="btn--logout">Log out</div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface User {
    username: string;
    score: number;
}
interface Room {
    need: number;
    name: string;
    desc: string;
}
@Component
export default class Dashboard extends Vue {
    user: User = {
        username: 'Egret',
        score: 300,
    };

    rooms: Room[] = [];
}
</script>

<style lang="scss" scoped>
    @import "../assets/scss/main";

    .left {
        position: relative;
        min-height: 100vh;
        height: 100%;
        width: 70vw;
        background-color: $white;
        padding: 100px;
    }

    .right {
        width: 30vw;
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: $light-green;
    }

    .line {
        display: flex;
    }

    .line--top {
        justify-content: space-between;
    }

    .line--second {
        margin-top: 100px;
    }

    .text--support {
        font-size: 36px;
        color: black;
    }

    .text--main {
        font-size: 48px;
        color: $light-green;
    }

    .text--empty {
        color: $red;
    }

    .rooms__empty {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
    }

    .rooms {
        min-height: 400px;
        position: relative;
    }

    .btn--logout {
        @include button;
        color: $white;
        background-color: $red;
        padding: 10px 50px;
        position: absolute;
        bottom: 150px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
