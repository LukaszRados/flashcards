<template>
     <header class='back'>
        <router-link :to='{ name: "index" }'>
            <svg xmlns='http://www.w3.org/2000/svg' width='29' height='25' viewBox='0 0 29 25'>
                <line x1='2' y1='13' x2='12' y2='2' />
                <line x1='2' y1='13' x2='12' y2='22' />
                <line x1='4' y1='13' x2='27' y2='12' />
            </svg>
            {{ text }}
        </router-link>
    </header>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: 'Back',
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/shared/back.scss'></style>
