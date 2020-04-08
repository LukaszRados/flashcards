import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const state = {
    lists: [],
    cards: {},
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
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
        state.user = user
        localStorage.setItem('user', JSON.stringify(user))
    }
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
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
})
