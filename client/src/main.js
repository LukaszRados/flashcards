import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'

import { routes } from './routes'
import store from './store'

import './scss/app.scss'

Vue.config.productionTip = false
Vue.use(VueRouter)
axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token') ? localStorage.getItem('token') : ''
Vue.prototype.$http = axios


const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('user') !== null) {
            next()
        } else {
            next({ name: 'login' })
        }
    }
    next()
})

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')
