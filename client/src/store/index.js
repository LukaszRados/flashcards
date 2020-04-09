import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const orderCardsBySuccessRate = (card1, card2) => {
    return card1.success_rate - card2.success_rate
}

const randomizeCards = () => {
    return Math.random() - 0.5
}

export const state = {
    lists: [],
    cards: {},
    user: localStorage.getItem('user') ? localStorage.getItem('user') : '',
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    notification: null,
}

export const mutations = {
    updateLists (state, lists) {
        state.lists = lists
    },
    updateCards (state, { listId, cards }) {
        state.cards[listId] = cards
    },
    updateSuccessRate () {
        console.log('success')
    },
    setNotification (state, notification) {
        state.notification = notification
    },
    clearNotification (state) {
        if (state.notification) clearTimeout(state.notification.timeout)
        state.notification = null
    },
    setUser (state, user) {
        state.user = user.username
        state.token = user.token
        localStorage.setItem('user', user.username)
        localStorage.setItem('token', user.token)
    },
    logout (state) {
        state.user = ''
        state.token = ''
    },
}

export const getters = {
    getCardsInRandomOrder: state => id => {
        return state.cards[id] ? state.cards[id].sort(orderCardsBySuccessRate).slice(0, 15).sort(randomizeCards) : []
    },
    getList: state => id => {
        return state.lists.find(list => list.id === id)
    }
}

export const actions = {
    fetchLists ({ commit }) {
        return axios.get('http://localhost:3000/lists').then(response => {
            commit('updateLists', response.data)
        })
    },

    fetchCards ({ commit }, listId) {
        return axios.get(`http://localhost:3000/cards/${listId}`).then(response => {
            commit('updateCards', { 
                listId, 
                cards: response.data.cards.map(card => {
                    card.success_rate = card.total > 0 ? card.correct / card.total : 0
                    return card
                })
            })
        })
    },

    createList ({ commit }, data) {
        return axios.post(`http://localhost:3000/lists`, data).then(response => {
            console.log(response, commit)
        })
    },

    updateList ({ commit }, data) {
        return axios.put(`http://localhost:3000/list/${data.id}`, data).then(response => {
            console.log(response, commit)
        })
    },

    feedback ({ commit }, data) {
        return axios.post(`http://localhost:3000/feedback/`, data).then(() => {
            commit('updateSuccessRate', data)
        })
    },

    login ({ commit, dispatch }, data) {
        return new Promise((resolve, reject) => {
            axios
                .post('http://localhost:3000/user/login', data)
                .then(response => response.data)
                .then(response => {
                    if (response.auth) {
                        commit('setUser', {
                            username: response.username,
                            token: response.token,
                        })
                        dispatch('pushNotification', {
                            type: 'success',
                            text: 'Welcome. Let\'s learn something awesome!'
                        })
                        axios.defaults.headers.common['x-access-token'] = response.token
                        resolve(response)
                    } else {
                        dispatch('pushNotification', {
                            type: 'error',
                            text: response.error ? response.error : 'Unable to authenticate.'
                        })
                        reject(response)
                    }
                }).catch((response) => {
                    dispatch('pushNotification', {
                        type: 'error',
                        text: 'Unable to authenticate.'
                    })
                    reject(response)
                })
        })
    },

    logout ({ commit }) {
        return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            delete axios.defaults.headers.common['x-access-token']
            resolve()
        })
    },

    pushNotification ({ commit }, notification) {
        commit('clearNotification')
        notification.timeout = setTimeout(() => {
            commit('clearNotification')
        }, 3000)
        commit('setNotification', notification)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
})
