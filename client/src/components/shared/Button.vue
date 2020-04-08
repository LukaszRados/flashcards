<template>
    <button
        class='button'
        :class='variantPrefixed'
        :type='type'
        :disabled='disabled'
    >{{ text }}</button>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'submit'
        },
        variant: {
            type: String,
            default: '',
        }
    },
    computed: {
        variantPrefixed () {
            return this.variant.split(/ /).map(v => `button--${v}`).join(' ')
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/shared/button.scss'></style>