import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        lists: [],
        userName: 'Lukasz',
    },

    mutations: {
        updateLists (state, lists) {
            state.lists = lists
        },
        updateCards (state, { listId, cards }) {
            state.lists.find(list => list.id === listId).cards = cards
        }
    },

    getters: {
        getCards: state => id => {
            return state.lists.find(list => list.id === id).cards
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
