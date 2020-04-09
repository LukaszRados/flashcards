<template>
    <div class='login'>
        <form @submit.prevent='submit' class='login__form' :class='{ "loading": loading }'>
            <h1>Express Flashcards</h1>
            <div class='login__inputs'>
                <input type='text' v-model='username' placeholder='Your e-mail address' required>
                <input type='password' v-model='password' placeholder='Your password' required>
            </div>
            <Button text='Start learning!' variant='big' :disabled='!canSubmit || loading' />
        </form>
    </div>
</template>

<script>
import Button from './../../components/shared/Button'
import { mapActions, mapState } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: '',
            loading: false,
        }
    },
    methods: {
        ...mapActions([
            'login',
            'pushNotification',
        ]),
        submit () {
            this.loading = true
            const formData = {
                username: this.username,
                password: this.password,
            }
            this.login(formData).then(() => {
                this.$router.push({ name: 'index' })
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        }
    },
    components: {
        Button,
    },
    computed: {
        ...mapState([
            'token'
        ]),
        canSubmit () {
            return this.username.length > 0 && this.password.length > 0
        }
    },
    created () {
        if (this.token) {
            this.pushNotification({
                text: 'Already signed in.',
                type: 'success'
            })
            this.$router.push({ name: 'index' })
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/auth/login.scss'></style>
