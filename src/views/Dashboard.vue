<template>
    <div class="dashboard">
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
                <GameRoom v-for="(room, index) in rooms" :room="room" :key="index"/>
            </div>
            <div class="btn--logout">Log out</div>
        </div>
        <div class="right">
            <form class="create">
                <div class="create__header">Create Room</div>
                <label>
                    <div class="create__label create__label--first">Room name</div>
                    <input class="create__input" type="text">
                </label>
                <label>
                    <div class="create__label">Description (optional)</div>
                    <textarea class="create__input create__input--area"></textarea>
                </label>
                <div class="create__btn">
                    Create
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameRoom from '@/components/GameRoom.vue';

interface User {
    username: string;
    score: number;
}
interface Room {
    people: number;
    name: string;
    description?: string;
}

@Component({
    components: { GameRoom },
})
export default class Dashboard extends Vue {
    user: User = {
        username: 'Egret',
        score: 300,
    };

    rooms: Room[] = [
        {
            people: 1,
            name: 'Game room',
            description: 'Fight the landlord!',
        },
        {
            people: 2,
            name: 'Let\'s play',
        },
        {
            people: 3,
            name: 'Game room Game room Game room',
            description: 'Fight the landlord!',
        },
    ];
}
</script>

<style lang="scss" scoped>
    @import "../assets/scss/main";

    .dashboard {
        display: flex;
    }

    .left {
        position: relative;
        min-height: 100vh;
        min-width: 980px;
        height: 100%;
        width: 70vw;
        background-color: $white;
        padding: 100px;
    }

    .right {
        width: 30vw;
        min-height: 100vh;
        height: 100%;
        min-width: 420px;
        background-color: $light-green;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .create__header {
        font-size: 48px;
        font-weight: bold;
        color: $white;
        margin-bottom: 20px;
    }

    .create__label {
        margin-top: 20px;
        font-size: 18px;
        font-weight: bold;
        color: $dark-green;
    }

    .create__label--first {
        margin-top: 0;
    }

    .create__input {
        font-size: 18px;
        color: $dark-green;
        padding: 5px;
        min-width: 300px;
        border: 1px solid $dark-green;
        border-radius: 5px;
        outline: none;
    }

    .create__input--area {
        height: 150px;
    }

    .create__btn {
        @include button;
        background-color: $dark-green;
        color: $white;
        margin-top: 30px;
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
        display: flex;
        align-items: center;
    }

    .btn--logout {
        @include button;
        color: $white;
        background-color: $red;
        padding: 10px 50px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
