import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        lists: [],
        cards: [],
        userName: 'Lukasz',
    },

    mutations: {
        updateLists (state, lists) {
            state.lists = lists
        },
        updateCards (state, { listId, cards }) {
            state.cards[listId] = cards
        }
    },

    getters: {
        getCards: state => id => {
            return state.cards[id] ? state.cards[id] : []
        }
    },

    actions: {
        fetchLists ({ commit }) {
            return axios.get('http://localhost:3000/lists').then(response => {
                commit('updateLists', response.data)
            })
        },

        fetchCards ({ commit }, listId) {
            return axios.get(`http://localhost:3000/cards/${listId}`).then(response => {
                commit('updateCards', { 
                    listId, 
                    cards: response.data
                })
            })
        }
    },
})

export {
    store
}
