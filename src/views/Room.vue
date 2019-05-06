<template>
    <div class="room">
        <div class="left">
            <div class="room__name">Room: {{ room.name }}</div>
        </div>
        <div class="right">
            <div class="info">
                <div class="info__title">Player List</div>
                <div class="info__list">
                    <p v-for="player in room.players"
                       :class="{'info__list--me': me.username === player.username}"
                       :key="player.username">{{ player.username }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Player, authorizeSocket, getRoomInfo } from '@/service/api';
import io from 'socket.io-client';
import BASE_URL from '@/service/config';

@Component
export default class Room extends Vue {
    socket = io(BASE_URL);

    me = {
        username: this.$store.state.username,
        chip: this.$store.state.chip,
    };

    room: {
        name: string;
        players: Player[];
    } = {
        name: '',
        players: [],
    };

    created() {
        this.socket.on('connect', async () => {
            try {
                const { data } = await authorizeSocket(this.socket.id, this.$route.params.roomName);
                if (data.status === 200) {
                    const { data: roomData } = await getRoomInfo(this.$route.params.roomName);
                    if (roomData.status === 200) {
                        this.room.name = roomData.name;
                        this.room.players = roomData.players;
                        this.listenEvents();
                    }
                } else {
                    alert('Unauthorized user!');
                    this.$router.push('/dashboard');
                    this.socket.disconnect();
                }
            } catch (e) {
                alert('Server error! Please try again');
                this.$router.push('/dashboard');
            }
        });
    }

    listenEvents() {
        this.socket.on('join', (player: Player) => {
            this.room.players.push(player);
        });
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/scss/main";

    .room {
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
    }

    .room__name {
        font-size: 40px;
        font-weight: bold;
        color: $light-green;
    }

    .info__title {
        font-size: 48px;
        font-weight: bold;
        color: $white;
        margin-left: 100px;
        margin-top: 150px;
    }

    .info__list {
        margin-left: 100px;
        font-size: 30px;
        color: $white;
    }

    .info__list--me {
        color: $red;
    }
</style>
