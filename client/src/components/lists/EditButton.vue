<template>
     <header class='edit-button'>
        <router-link :to='{ name: "edit", params: { id: $route.params.id }}'>
            Edit list
        </router-link>
    </header>
</template>

<script>
export default {
}
</script>

<style lang='scss' scoped src='@/scss/components/lists/edit-button.scss'></style>
