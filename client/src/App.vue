<template>
    <div>
        <transition name='fade' mode='out-in'>
            <router-view></router-view>
        </transition>
        <Notification />
    </div>
</template>

<script>
import Notification from './components/shared/Notification'

export default {
    components: {
        Notification,
    }
}
</script>
