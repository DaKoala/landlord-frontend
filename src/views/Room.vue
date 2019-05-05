<template>
    <div class="room">
        <div class="left"></div>
        <div class="right"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authorizeSocket } from '@/service/api';
import io from 'socket.io-client';
import BASE_URL from '@/service/config';

@Component
export default class Room extends Vue {
    socket = io(BASE_URL);

    created() {
        this.socket.on('connect', async () => {
            try {
                const { data } = await authorizeSocket(this.socket.id);
                if (data.status !== 200) {
                    alert('Unauthorized user!');
                    this.$router.push('/dashboard');
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
