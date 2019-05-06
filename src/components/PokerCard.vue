<template>
    <div class="card" :style="cardColor">
        <div class="card__text">{{ cardText }}</div>
        <div class="card__suit">{{ cardSuit }}</div>
        <div class="card__suit--center">{{ cardSuit }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

enum Suit {
    Spade,
    Heart,
    Club,
    Diamond,
}

interface Card {
    point: number;
    suit: Suit;
}

@Component
export default class PokerCard extends Vue {
    @Prop() card = {
        point: 2,
        suit: Suit.Diamond,
    };

    get cardText() {
        if (this.card.point === 14) {
            return 'A';
        }
        if (this.card.point === 13) {
            return 'K';
        }
        if (this.card.point === 12) {
            return 'Q';
        }
        if (this.card.point === 11) {
            return 'J';
        }
        return String(this.card.point);
    }

    get cardColor() {
        if (this.card.suit === Suit.Spade) {
            return { color: 'black' };
        }
        if (this.card.suit === Suit.Heart) {
            return { color: 'red' };
        }
        if (this.card.suit === Suit.Club) {
            return { color: 'green' };
        }
        return { color: 'blue' };
    }

    get cardSuit() {
        if (this.card.suit === Suit.Spade) {
            return '♠';
        }
        if (this.card.suit === Suit.Heart) {
            return '♥';
        }
        if (this.card.suit === Suit.Club) {
            return '♣';
        }
        return '♦';
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/scss/main";

    .card {
        position: relative;
        background: white;
        padding: 0 5px;
        width: 120px;
        height: 160px;
        border-radius: 10px;
    }

    .card__text {
        font-size: 28px;
    }

    .card__suit {
        font-size: 36px;
        position: absolute;
        left: 3px;
        top: 16px;
    }

    .card__suit--center {
        font-size: 60px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
