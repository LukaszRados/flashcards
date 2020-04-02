<template>
    <div class='list'>
        <div class='list__inner' :style='{ transform: translate }'>
            <Card
                v-for='card in list.cards'
                :key='card.id'
                :front='card.word'
                :back='card.translation'
                :active='activeCard === card'
                :ref='card.id'
            />
        </div>
        <ListButton
            type='next'
            @click=next
            v-if='index < list.cards.length - 1'
        />
        <ListButton
            type='prev'
            @click='previous'
            v-if='index !== 0' 
        />
    </div>
</template>

<script>
import Card from './../../components/lists/Card'
import ListButton from './../../components/lists/ListButton'

export default {
    data () {
        return {
            list: this.$store.getters.getListById(1),
            index: 0,
            activeCard: {},
        }
    },
    components: {
        Card,
        ListButton,
    },
    computed: {
        translate () {
            if (!this.activeCard || !this.$refs[this.activeCard.id]) return ''

            const screenWidth = document.body.clientWidth
            const cardWidth = this.$refs[this.activeCard.id][0].$el.clientWidth

            return `translateX(${screenWidth / 2 - cardWidth / 2 - cardWidth * this.index}px)`
        },
    },
    methods: {
        next () {
            console.log('next')
            this.index++
            this.activeCard = this.list.cards[this.index]
        },
        previous () {
            console.log('prev')
            this.index--
            this.activeCard = this.list.cards[this.index]
        }
    },
    mounted () {
        this.activeCard = this.list.cards[this.index]
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/list.scss'></style>
