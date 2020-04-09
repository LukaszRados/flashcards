<template>
    <ul class='feedback'>
        <transition-group name='shrink'>
            <li key='1' v-if='!feedbackSent || feedbackSent === 1'>
                <button
                    type='button' 
                    class='feedback__button feedback__button--correct'
                    @click.stop='sendFeedback(1)'
                    :disabled='feedbackSent'>❤️</button>
            </li>
            <li key='-1' v-if='!feedbackSent || feedbackSent === -1'>
                <button
                    type='button'
                    class='feedback__button feedback__button--incorrect'
                    @click.stop='sendFeedback(-1)'
                    :disabled='feedbackSent'>💩</button>
            </li>
        </transition-group>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        list_id: {
            type: String,
            required: true,
        },
        card_id: {
            type: String,
            required: true,
        }
    },
    data () {
        return {
            feedbackSent: null,
        }
    },
    methods: {
        ...mapActions([
            'feedback'
        ]),
        sendFeedback (value) {
            this.feedback({
                list_id: this.list_id,
                card_id: this.card_id,
                value,
            })
            this.feedbackSent = value
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/feedback.scss'></style>
