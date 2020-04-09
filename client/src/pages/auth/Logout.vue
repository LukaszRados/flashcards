<template>
    <div></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions([
            'pushNotification',
        ])
    },
    created () {
        this.$store.dispatch('logout').then(() => {
            this.pushNotification({
                text: 'You have signed out.',
                type: ''
            })
            this.$router.push({ name: 'login' })
        })
    }
}
</script>
