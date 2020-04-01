<template>
    <div>
        <Header>
            <p>Create a new list</p>
            <h1><input type='text' name='title' placeholder='Enter list name here'></h1>
        </Header>
    </div>
</template>

<script>
import Header from './../../components/shared/Header'

export default {
    components: {
        Header,
    }
}
</script>