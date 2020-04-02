<template>
    <button
        class='list-button'
        :class='{ 
            "list-button--prev": type === "prev",
            "list-button--next": type === "next"
        }'
        type='button'
        @click='click'
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 14 24">
            <line x1="2" y1="13" x2="12" y2="2" />
            <line x1="2" y1="13" x2="12" y2="22" />
        </svg>
    </button>
</template>

<script>
export default {
    props: [ 'type' ],
    methods: {
        click () {
            this.$emit('click')
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/button.scss'></style>
