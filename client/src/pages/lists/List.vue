<template>
    <div>
        <div class='list-header'>
            <Back />
            <EditButton />
        </div>
        <div class='list' v-if='!isLoading'>
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
        <Loader v-if='isLoading' />
        <Progress :value='progress' v-if='!isLoading' />
    </div>
</template>

<script>
import Card from './../../components/lists/Card'
import ListButton from './../../components/lists/ListButton'
import Progress from './../../components/lists/Progress'
import EditButton from './../../components/lists/EditButton'
import Loader from './../../components/shared/Loader'
import Back from './../../components/shared/Back'
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            index: 0,
            translate: '',
            listId: this.$route.params.id,
            isLoading: true,
        }
    },
    components: {
        Card,
        ListButton,
        Progress,
        Loader,
        Back,
        EditButton,
    },
    computed: {
        cards () {
            return this.$store.getters.getCardsInRandomOrder(this.listId)
        },
        progress () {
            return Math.round((this.index) / (this.cards.length - 1) * 100)
        },
        activeCard () {
            return this.cards[this.index]
        },
    },
    methods: {
        ...mapActions({
            fetchCards: 'fetchCards',
        }),
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
    created () {
        this.isLoading = true
        this.fetchCards(this.listId).then(() => {
            this.isLoading = false
            this.$nextTick(this.updatePosition)
        })
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/list.scss'></style>
