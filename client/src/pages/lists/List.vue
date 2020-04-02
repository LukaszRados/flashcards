<template>
    <div class='list'>
        <div class='list__inner' :style='{ transform: translate }' @click='next()'>
            <Card
                v-for='card in list.cards'
                :key='card.id'
                :front='card.word'
                :back='card.translation'
                :active='activeCard === card'
                :ref='card.id'
            />
        </div>
    </div>
</template>

<script>
import Card from './../../components/lists/Card'

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
            this.index = this.index === this.list.cards.length - 1 ? 0 : this.index + 1
            this.activeCard = this.list.cards[this.index]
        }
    },
    mounted () {
        this.activeCard = this.list.cards[this.index]
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/list.scss'></style>
