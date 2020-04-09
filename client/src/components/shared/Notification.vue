<template>
    <transition name='notification'>
        <div
            class='notification'
            :class='className'
            v-if='notification'
            @click='clearNotification'
        >{{ notification.text }}</div>
    </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapState([
            'notification'
        ]),
        className () {
            return `notification--${this.notification.type}`
        }
    },
    methods: {
        ...mapMutations([
            'clearNotification'
        ])
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/shared/notification.scss'></style>
