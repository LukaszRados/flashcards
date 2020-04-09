<template>
    <div class='card' :class='{ "is-hidden": !active }'>
        <div class='card__inner' @click='toggle'>
            <transition name='flip-card'>
                <div class='card__side card__side--front' v-if='activeSide === "front"' key='front'>
                    <span class='card__word'>{{ card.word }}</span>
                </div>
                <div class='card__side card__side--back' v-else key='back'>
                    <span class='card__original'>{{ card.word }}</span>
                    <span class='card__word'>{{ card.translation }}</span>
                    <CardFeedback :list_id='list_id' :card_id='card.id' />
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import CardFeedback from './CardFeedback'

export default {
    props: {
        list_id: {
            type: String,
            required: true,
        },
        card: {
            type: Object,
            required: true,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            activeSide: 'front',
        }
    },
    components: {
        CardFeedback
    },
    methods: {
        toggle () {
            if (!this.active) return
            this.activeSide = this.activeSide === 'front' ? 'back' : 'front' 
        },
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/card.scss'></style>
