import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const state = {
    lists: [],
    cards: {},
    userName: 'Lukasz',
}

export const mutations = {
    updateLists (state, lists) {
        state.lists = lists
    },
    updateCards (state, { listId, cards }) {
        state.cards[listId] = cards
    }
}

export const getters = {
    getCards: state => id => {
        return state.cards[id] ? state.cards[id] : []
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
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
})
