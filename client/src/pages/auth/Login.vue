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
import { mapMutations, mapActions } from 'vuex'

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
        ...mapActions([
            'login'
        ]),
        submit () {
            this.loading = true
            const formData = {
                username: this.username,
                password: this.password,
            }
            this.login(formData).then(() => {
                this.$router.push({ path: '/' })
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
        canSubmit () {
            return this.username.length > 0 && this.password.length > 0
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/auth/login.scss'></style>
