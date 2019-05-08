<template>
    <div class="dashboard">
        <div class="left">
            <div class="line line--top">
                <p>
                    <span class="text--support">Welcome, </span>
                    <span class="text--main">{{ user.username }}</span>
                </p>
                <p>
                    <span class="text--support">Chip: </span>
                    <span class="text--main">{{ user.chip }}</span>
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
            <div class="btn--logout" @click="handleLogout">Log out</div>
        </div>
        <div class="right">
            <form class="create">
                <div class="create__header">Create Room</div>
                <label>
                    <div class="create__label create__label--first">Room name</div>
                    <input class="create__input" type="text" v-model="newRoom.name">
                </label>
                <label>
                    <div class="create__label">Description (optional)</div>
                    <textarea
                        class="create__input create__input--area"
                        v-model="newRoom.description"></textarea>
                </label>
                <div class="create__btn" @click="handleCreateRoom">
                    Create
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameRoom from '@/components/GameRoom.vue';
import {
    Room, me, logout, getAllRooms, createRoom,
} from '@/service/api';

interface User {
    username: string;
    chip: number;
}

@Component({
    components: { GameRoom },
})
export default class Dashboard extends Vue {
    user: User = {
        username: '',
        chip: 0,
    };

    newRoom = {
        name: '',
        description: '',
    };

    rooms: Room[] = [];

    async created() {
        this.fetchUserInfo();
        this.fetchRooms();
    }

    async fetchRooms() {
        const { data } = await getAllRooms();
        if (data.status === 200) {
            this.rooms = data.rooms;
        }
    }

    async fetchUserInfo() {
        const { data } = await me();
        if (data.status === 200) {
            this.user.username = data.user.username;
            this.user.chip = data.user.chip;
            this.$store.commit('updateUser', {
                username: data.user.username,
                chip: data.user.chip,
            });
        }
    }

    async handleLogout() {
        try {
            await logout();
            this.$router.push('/');
        } catch (e) {
            this.$router.push('/');
        }
    }

    async handleCreateRoom() {
        if (this.newRoom.name === '') {
            alert('Room name cannot be empty!');
            return;
        }
        try {
            const { data } = await createRoom(this.newRoom.name, this.newRoom.description);
            if (data.status === 200) {
                this.rooms.push(data.room);
                this.newRoom.name = '';
                this.newRoom.description = '';
            } else {
                alert(data.msg);
            }
        } catch (e) {
            alert('Server error! Please try again.');
        }
    }
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
