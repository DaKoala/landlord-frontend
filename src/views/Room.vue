<template>
    <div class="room">
        <div class="left">
            <div class="room__name">Room: {{ room.name }}</div>
            <div class="announcement">
                <div>{{ announcement }}</div>
                <div>
                    <font-awesome-icon :icon="['fas', 'funnel-dollar']"></font-awesome-icon>
                    <span>{{ pot }}</span>
                </div>
            </div>
            <div class="public">
                <PokerCard v-for="card in publicCards" :card="card" :key="card.point + card.suit"/>
            </div>
            <div class="player--me">
                <div>
                    <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
                    {{ me.username }}
                </div>
                <div>
                    <font-awesome-icon :icon="['fas', 'coins']"></font-awesome-icon>
                    {{ me.chip }}
                </div>
                <div>
                    <font-awesome-icon :icon="['fas', 'hand-holding-usd']"></font-awesome-icon>
                    {{ me.betChip }}
                </div>
            </div>
            <div v-for="(player, index) in otherPlayers"
                 :key="player.username + player.chip"
                 class="player"
                 :class="{'player--left': index === 0, 'player--right': index === 1}">
                <div>
                    <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
                    {{ player.username }}
                </div>
                <div>
                    <font-awesome-icon :icon="['fas', 'coins']"></font-awesome-icon>
                    {{ player.chip }}
                </div>
                <div>
                    <font-awesome-icon :icon="['fas', 'hand-holding-usd']"></font-awesome-icon>
                    {{ player.betChip }}
                </div>
                <div class="player__cards">
                    <PokerCard v-for="card in player.cards"
                               :key="card.point + card.suit"
                               :card="card"/>
                </div>
            </div>
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
import PokerCard from '@/components/PokerCard.vue';

interface Card {
    point: number;
    suit: number;
}

interface PlayerInGame extends Player {
    betChip: number;
    cards: Card[];
}

@Component({
    components: { PokerCard },
})
export default class Room extends Vue {
    socket = io(BASE_URL);

    announcement = 'Waiting for players...';

    pot = 0;

    me: PlayerInGame = {
        username: this.$store.state.username,
        chip: this.$store.state.chip,
        betChip: 0,
        cards: [],
    };

    publicCards: Card[] = [
        {
            point: 13,
            suit: 2,
        },
    ];

    room: {
        name: string;
        players: PlayerInGame[];
    } = {
        name: '',
        players: [],
    };

    get otherPlayers() {
        return this.room.players.filter(player => player.username !== this.me.username);
    }

    created() {
        this.socket.on('connect', async () => {
            try {
                const { data } = await authorizeSocket(this.socket.id, this.$route.params.roomName);
                if (data.status === 200) {
                    const { data: roomData } = await getRoomInfo(this.$route.params.roomName);
                    if (roomData.status === 200) {
                        this.room.name = roomData.name;
                        this.room.players = roomData.players.map(
                            player => Object.assign(player, { betChip: 0, cards: [] }),
                        );
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

    getPlayerByName(username: string): PlayerInGame {
        if (username === this.me.username) {
            return this.me;
        }
        for (let i = 0; i < this.room.players.length; i += 1) {
            if (this.room.players[i].username === username) {
                return this.room.players[i];
            }
        }
        return this.me;
    }

    listenEvents() {
        this.socket.on('join', this.onNewPlayer);
        this.socket.on('publicCard', this.onPublicCard);
        this.socket.on('announcement', this.onAnnouncement);
        this.socket.on('bet', this.onBet);
        this.socket.on('card', this.onCard);
    }

    onNewPlayer(player: Player) {
        this.room.players.push(Object.assign(player, { betChip: 0, cards: [] }));
    }

    onPublicCard(card: Card) {
        this.publicCards.push(card);
    }

    onAnnouncement(message: string) {
        this.announcement = message;
    }

    onBet(payload: { username: string, chip: number }) {
        const player = this.getPlayerByName(payload.username);
        player.chip -= payload.chip;
        player.betChip += payload.chip;
    }

    onCard(payload: { username: string, card: Card }) {
        const player = this.getPlayerByName(payload.username);
        player.cards.push(payload.card);
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
        min-width: 980px;
        width: 70vw;
        background-color: $dark-green;
        padding: 100px;
    }

    .right {
        width: 30vw;
        min-width: 420px;
        background-color: $light-green;
    }

    .left, .right {
        height: 100vh;
        min-height: 800px;
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

    .player {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 36px;
        color: $white;
    }

    .player--left {
        left: 100px;
    }

    .player--right {
        right: 100px;
    }

    .player--me {
        position: absolute;
        left: 100px;
        bottom: 100px;
        font-size: 36px;
        color: $red;
    }

    .player__cards {
        display: flex;
        transform: scale(0.5, 0.5);
    }

    .public {
        position: absolute;
        top: 20%;
        left: 50%;
        display: flex;
        transform: translateX(-50%);
    }

    .announcement {
        text-align: center;
        position: absolute;
        font-size: 36px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: $light-green;
    }

    .announcement span {
        margin-left: 10px;
    }
</style>
