<template>
    <div>
        <Header>
            <p>Hello, {{ user }}</p>
            <h1>My lists</h1>
        </Header>
        <Lists />
    </div>
</template>

<script>
import Header from './../components/shared/Header'
import Lists from './../components/lists/Lists'
import { mapState } from 'vuex'

export default {
    data () {
        return {}
    },
    computed: mapState([
        'user'
    ]),
    components: {
        Header,
        Lists,
    },
}
</script>