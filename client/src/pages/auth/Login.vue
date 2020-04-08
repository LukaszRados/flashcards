<template>
    <div class='login'>
        <form @submit.prevent='submit' class='login__form' :disable='loading'>
            <h1>Express Flashcards</h1>
            <div class='login__inputs'>
                <input type='text' v-model='username' placeholder='Your e-mail address' required>
                <input type='password' v-model='password' placeholder='Your password' required>
            </div>
            <Button text='Start learning!' variant='big' :disabled='!canSubmit' />
        </form>
    </div>
</template>

<script>
import Button from './../../components/shared/Button'
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
    data () {
        return {
            username: '',
            password: '',
            loading: false,
        }
    },
    methods: {
        ...mapMutations([
            'setUser',
            'setNotification'
        ]),
        submit () {
            this.loading = true
            const formData = {
                username: this.username,
                password: this.password,
            }
            axios
                .post('http://localhost:3000/user/login', formData)
                .then(response => response.data)
                .then(response => {
                    if (response.auth) {
                        this.setUser({
                            username: response.username,
                            token: response.token,
                        })
                        this.setNotification({
                            type: 'success',
                            text: 'Welcome. Let\'s learn something awesome!'
                        })
                        this.$router.push({ path: '/' })
                    } else {
                        this.setNotification({
                            type: 'error',
                            text: response.error ? response.error : 'Unable to authenticate.'
                        })
                    }
                }).catch(() => {
                    this.setNotification({
                        type: 'error',
                        text: 'Unable to authenticate.'
                    })
                }).finally(() => {
                    this.loading = false
                })
        }
    },
    components: {
        Button,
    },
    computed: {
        canSubmit () {
            return this.username.length > 0 && this.password.length > 0
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/auth/login.scss'></style>
