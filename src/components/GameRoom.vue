<template>
    <div class="game" @click="enterRoom">
        <img :src="icon" class="game__icon" alt="two people in a room"/>
        <p class="game__people">{{ people }}</p>
        <p class="game__desc">Room name: {{ room.name }}</p>
        <p class="game__desc">{{ room.description || '(No description)' }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

const roomImage = require('@/assets/images/room.png');

interface Room {
    people: 0 | 1 | 2 | 3;
    name: string;
    description?: string;
}

@Component
export default class GameRoom extends Vue {
    @Prop() room!: Room;

    icon = roomImage;

    get people() {
        const MAX_PEOPLE = 3;
        if (this.room.people === MAX_PEOPLE) {
            return 'Full';
        }
        return `Need ${MAX_PEOPLE - this.room.people}`;
    }

    enterRoom() {
        this.$router.push(`/room/${this.room.name}`);
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/scss/main";

    .game {
        margin-right: 30px;
        max-width: 300px;
        overflow: hidden;
        cursor: pointer;
    }

    .game__icon {
        display: block;
        height: 150px;
    }

    .game__people {
        font-size: 30px;
        font-weight: bold;
        color: $light-green;
        margin: 10px 0 0 0;
    }

    .game__desc {
        font-size: 18px;
        color: $light-green;
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
