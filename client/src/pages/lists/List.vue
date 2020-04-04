<template>
    <div>
        <header class='list-header'>
            <router-link to='/'>
                <svg xmlns='http://www.w3.org/2000/svg' width='29' height='25' viewBox='0 0 29 25'>
                    <line x1='2' y1='13' x2='12' y2='2' />
                    <line x1='2' y1='13' x2='12' y2='22' />
                    <line x1='4' y1='13' x2='27' y2='12' />
                </svg>
                Back
            </router-link>
        </header>
        <div class='list' v-if='cards'>
            <div class='list__inner' :style='{ transform: translate }'>
                <Card
                    v-for='card in cards'
                    :key='card.id'
                    :front='card.word'
                    :back='card.translation'
                    :active='activeCard === card'
                    :ref='card.id'
                />
            </div>
            <ListButton
                type='next'
                @click='next'
                v-if='index < cards.length - 1'
            />
            <ListButton
                type='prev'
                @click='previous'
                v-if='index !== 0' 
            />
        </div>
        <Progress :value='progress' v-if='cards' />
        <Loader v-if='!cards || cards.length === 0' />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Card from './../../components/lists/Card'
import ListButton from './../../components/lists/ListButton'
import Progress from './../../components/lists/Progress'
import Loader from './../../components/shared/Loader'

export default {
    data () {
        return {
            cards: [],
            index: 0,
            translate: '',
            listId: parseInt(this.$route.params.id, 10),
        }
    },
    components: {
        Card,
        ListButton,
        Progress,
        Loader,
    },
    computed: {
        progress () {
            return Math.round((this.index) / (this.cards.length - 1) * 100)
        },
        activeCard () {
            return this.cards[this.index]
        },
    },
    methods: {
        ...mapActions([
            'fetchCards',
        ]),
        next () {
            this.index++
            this.updatePosition()
        },
        previous () {
            this.index--
            this.updatePosition()
        },
        updatePosition () {
            if (!this.activeCard || !this.$refs[this.activeCard.id]) return ''

            const screenWidth = document.body.clientWidth
            const cardWidth = this.$refs[this.activeCard.id][0].$el.clientWidth

            this.translate = `translateX(${screenWidth / 2 - cardWidth / 2 - cardWidth * this.index}px)`
        }
    },
    mounted () {
        this.fetchCards(this.listId).then(() => {
            this.cards = this.$store.getters.getCards(this.listId)
            this.$nextTick(this.updatePosition)
        })
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/list.scss'></style>
