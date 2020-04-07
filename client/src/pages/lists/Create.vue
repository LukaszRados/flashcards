<template>
    <div>
        <Back />
        <form @submit.prevent='submit' class='form' method='POST' :disabled='loading'>
            <div class='form__title'>
                <button type='button' class='form__emoji' v-html='emoji' @click.prevent='emoji = randomEmoji()'></button>
                <input type='text' v-model='title' placeholder='Title of your deck' />
            </div>
            <div v-for='(card, index) in cards' :key='card.id' class='form__card'>
                <input type='text' v-model='cards[index].word' placeholder='word'>
                <input type='text' v-model='cards[index].translation' placeholder='translation'>
                <button type='button' @click='removeCard(card)'>🔥</button>
            </div>
            <div>
                <button type='button' @click='addCard' class='form__create'>+ next card</button>
                <button type='submit' :disabled='!formIsReady' class='form__button'>Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import Back from './../../components/shared/Back'
import randomEmoji from './../../mixins/emoji'
import { mapActions } from 'vuex'

export default {
    components: {
        Back,
    },
    mixins: [ randomEmoji ],
    data () {
        return {
            emoji: this.randomEmoji(),
            title: '',
            cards: [{
                id: +new Date(),
                word: '',
                translation: '',
            }],
            loading: false,
        }
    },
    computed: {
        formIsReady () {
            return this.cards.length > 0 && this.title.length > 0
        }
    },
    methods: {
        ...mapActions([
            'createList'
        ]),
        submit () {
            this.loading = true
            this.createList({
                title: this.title,
                emoji: this.emoji,
                cards: this.cards,
            }).then(() => {
                this.title = ''
                this.emoji = this.randomEmoji()
                this.cards = []
                this.loading = false
            })
        },
        addCard () {
            this.cards.push({
                id: +new Date(),
                word: '',
                translation: '',
            })
        },
        removeCard (cardToRemove) {
            this.cards = this.cards.filter(card => card !== cardToRemove)
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/form.scss'></style>
