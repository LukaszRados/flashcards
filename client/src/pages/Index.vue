<template>
    <div>
        <Header>
            <p>Hello, Lukasz</p>
            <h1>My lists</h1>
        </Header>
        <Lists />
    </div>
</template>

<script>
import Header from './../components/shared/Header'
import Lists from './../components/lists/Lists'

export default {
    data () {
        return {}
    },
    components: {
        Header,
        Lists,
    },
}
</script>