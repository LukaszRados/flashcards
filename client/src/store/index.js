import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const state = {
    lists: [],
    cards: {},
    user: localStorage.getItem('user') ? localStorage.getItem('user') : '',
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    notification: '',
}

export const mutations = {
    updateLists (state, lists) {
        state.lists = lists
    },
    updateCards (state, { listId, cards }) {
        state.cards[listId] = cards
    },
    setNotification (state, notification) {
        state.notification = notification
    },
    removeNotification (state) {
        state.notification = ''
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
    getCards: state => id => {
        return state.cards[id] ? state.cards[id] : []
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
                cards: response.data.cards
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

    login ({ commit }, data) {
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
                        commit('setNotification', {
                            type: 'success',
                            text: 'Welcome. Let\'s learn something awesome!'
                        })
                        axios.defaults.headers.common['x-access-token'] = response.token
                        resolve(response)
                    } else {
                        commit('setNotification', {
                            type: 'error',
                            text: response.error ? response.error : 'Unable to authenticate.'
                        })
                        reject(response)
                    }
                }).catch((response) => {
                    commit('setNotification', {
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
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
})
