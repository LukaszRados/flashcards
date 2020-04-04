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
        <div class='list'>
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
        <Progress :value='progress' />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Card from './../../components/lists/Card'
import ListButton from './../../components/lists/ListButton'
import Progress from './../../components/lists/Progress'

export default {
    data () {
        return {
            cards: [],
            index: 0,
            activeCard: {},
            translate: '',
        }
    },
    components: {
        Card,
        ListButton,
        Progress,
    },
    computed: {
        progress () {
            return Math.round((this.index) / (this.cards.length - 1) * 100)
        }
    },
    watch: {
        activeCard () {
            this.updatePosition()
        }
    },
    methods: {
        ...mapActions([
            'fetchCards',
            'fetchLists',
        ]),
        next () {
            this.index++
            this.activeCard = this.cards[this.index]
        },
        previous () {
            this.index--
            this.activeCard = this.cards[this.index]
        },
        updatePosition () {
            if (!this.activeCard || !this.$refs[this.activeCard.id]) return ''
            const screenWidth = document.body.clientWidth
            const cardWidth = this.$refs[this.activeCard.id][0].$el.clientWidth

            this.translate = `translateX(${screenWidth / 2 - cardWidth / 2 - cardWidth * this.index}px)`
        }
    },
    mounted () {
        const listId = parseInt(this.$route.params.id, 10)
        this.fetchLists().then(() => {
            this.fetchCards(listId).then(() => {
                this.cards = this.$store.getters.getCards(listId)
                this.activeCard = this.cards[this.index]
                this.$nextTick(() => {
                    this.updatePosition()
                })
            })
        })
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/list.scss'></style>
