<template>
    <div
        class='notification'
        :class='className'
        v-if='notification'
        @click='removeNotification'
    >{{ notification.text }}</div>
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
            'removeNotification'
        ])
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/shared/notification.scss'></style>
