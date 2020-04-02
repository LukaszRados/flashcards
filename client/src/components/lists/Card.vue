<template>
    <div class='card' :class='{ "is-hidden": !active, "is-turned": !revealed }'>
        <div class='card__inner'>
            <div class='card__front'>
                <span class='card__word'>{{ front }}</span>
            </div>
            <div class='card__back'>
                <span class='card__word is-hidden'>{{ back }}</span>
            </div>
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
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/card.scss'></style>
