<template>
    <router-link :to=url  class='item' :class='{ "item--create": item.type === "create" }'>
        <span class='item__text'>
            <span class='item__count' v-if='item.type === "create"'>Learning something new?</span>
            <span class='item__count' v-else>{{ counter }}</span>
            <span class='item__title'>{{ item.title }}</span>
        </span>
        <span class='item__emoji' v-html='item.emoji'></span>
    </router-link>
</template>

<script>
export default {
    props: {
        item: Object,
    },
    computed: {
        count () {
            return this.item.cards.length
        },
        counter () {
            if (this.count === 0) return `no cards`
            return `${this.count} ${this.count === 1 ? 'card' : 'cards'}` 
        },
        link () {
            return this.item.type === 'create' ? '#create' : '#'
        },
        url () {
            return this.item.type === 'create' ? '/list/create' : `/list/${this.item.id}`
        }
    }
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/thumbnail.scss'></style>