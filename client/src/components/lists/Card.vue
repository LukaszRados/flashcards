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
                    <ul class='card__feedback'>
                        <transition-group name='shrink'>
                            <li key='1' v-if='!feedbackSent || feedbackSent === 1'>
                                <button
                                    type='button' 
                                    class='card__button card__button--correct'
                                    @click.stop='sendFeedback(1)'
                                    :disabled='feedbackSent'>❤️</button>
                            </li>
                            <li key='-1' v-if='!feedbackSent || feedbackSent === -1'>
                                <button
                                    type='button'
                                    class='card__button card__button--incorrect'
                                    @click.stop='sendFeedback(-1)'
                                    :disabled='feedbackSent'>💩</button>
                            </li>
                        </transition-group>
                    </ul>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

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
            feedbackSent: null,
        }
    },
    methods: {
        ...mapActions([
            'feedback'
        ]),
        toggle () {
            if (!this.active) return
            this.activeSide = this.activeSide === 'front' ? 'back' : 'front' 
        },
        sendFeedback (value) {
            this.feedback({
                list_id: this.list_id,
                card_id: this.card.id,
                value,
            })
            this.feedbackSent = value
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/card.scss'></style>
