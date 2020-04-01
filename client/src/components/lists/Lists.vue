<template>
    <div class='lists'>
        <Thumbnail v-for='list in lists' v-bind:key='list.id' :item=list />
        <Thumbnail :item=newItem />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Thumbnail from './Thumbnail'

export default {
    data () {
        return {
            newItem: {
                emoji: '🧠',
                title: 'Create a new list',
                type: 'create'
            }
        }
    },
    computed: {
        ...mapState([
            'lists'
        ])
    },
    components: {
        Thumbnail,
    }
}
</script>

<style scoped lang='scss'>
.lists {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 20px;
}
</style>