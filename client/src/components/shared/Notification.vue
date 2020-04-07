<template>
    <div class='notification' v-if='notification' @click='removeNotification'>{{ notification }}</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapState([
            'notification'
        ]),
    },
    methods: {
        ...mapMutations([
            'removeNotification'
        ])
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/shared/notification.scss'></style>
