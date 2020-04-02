<template>
    <div class='card' :class='{ "is-hidden": !active, "is-turned": !revealed }'>
        <div class='card__inner' @click='toggle'>
            <transition name='flip-card'>
                <div class='card__side card__side--front' v-if='activeSide === "front"'>
                    <span class='card__word'>{{ front }}</span>
                </div>
                <div class='card__side card__side--back' v-else>
                    <span class='card__word'>{{ back }}</span>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        front: {
            type: String,
            required: true,
        },
        back: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: false,
        },
        revealed: {
            type: Boolean,
            default: false,
        }
    },
    data () {
        return {
            activeSide: 'front',
        }
    },
    methods: {
        toggle () {
            this.activeSide = this.activeSide === 'front' ? 'back' : 'front' 
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/card.scss'></style>
