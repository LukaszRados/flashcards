<template>
    <div class='progress-bar'>
        <div class='progress-bar__bar'>
            <div class='progress-bar__value' :style='{ "width": percentage }'></div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'value' ],
    computed: {
        percentage () {
            return `${this.value}%`
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/progress-bar.scss'></style>
