<template>
    <div class="room">
        <div class="left">
            Room: {{ room.name }}
        </div>
        <div class="right"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authorizeSocket, getRoomInfo } from '@/service/api';
import io from 'socket.io-client';
import BASE_URL from '@/service/config';

@Component
export default class Room extends Vue {
    socket = io(BASE_URL);

    room = {
        name: '',
    };

    created() {
        this.socket.on('connect', async () => {
            try {
                const { data } = await authorizeSocket(this.socket.id, this.$route.params.roomName);
                if (data.status === 200) {
                    const { data: roomData } = await getRoomInfo(this.$route.params.roomName);
                    if (roomData.status === 200) {
                        this.room.name = roomData.name;
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
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
