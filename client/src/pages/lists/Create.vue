<template>
    <div>
        <Back />
        <Loader v-if='!initialised' />
        <form
            method='POST'
            class='form'
            :class='{ "is-loading": loading }'
            :disabled='loading'
            @submit.prevent='submit'
            v-if='initialised'
        >
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
import Loader from './../../components/shared/Loader'
import randomEmoji from './../../mixins/emoji'
import { mapActions, mapMutations } from 'vuex'

export default {
    components: {
        Back,
        Loader,
    },
    mixins: [ randomEmoji ],
    data () {
        return {
            id: this.$route.params.id,
            emoji: this.randomEmoji(),
            title: '',
            cards: [{
                id: +new Date(),
                word: '',
                translation: '',
            }],
            loading: false,
            initialised: false,
        }
    },
    computed: {
        formIsReady () {
            return this.cards.length > 0 && this.title.length > 0
        }
    },
    methods: {
        ...mapActions([
            'createList',
            'fetchLists',
            'updateList',
        ]),
        ...mapMutations([
            'setNotification'
        ]),
        submit () {
            this.loading = true

            const data = {
                title: this.title,
                emoji: this.emoji,
                cards: this.cards,
            }

            if (this.id) {
                this.updateList({
                    id: this.id,
                    ...data,
                }).then(() => {
                    this.loading = true
                    this.setNotification('Card deck was updated.')
                    this.$router.push({ path: '/' })
                })
            } else {
                this.createList(data).then(() => {
                    this.loading = true
                    this.setNotification('Card deck was added.')
                    this.$router.push({ path: '/' })
                })
            }
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
    },
    created () {
        if (this.id) {
            this.fetchLists(this.id).then(() => {
                const list = this.$store.getters.getList(this.id)
                this.title = list.title
                this.emoji = list.emoji
                this.cards = [ ...list.cards ]
                this.initialised = true
            })
        } else {
            this.initialised = true
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/form.scss'></style>
