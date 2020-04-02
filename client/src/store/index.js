import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        lists: [{
            id: 1,
            title: 'Song lyrics',
            count: 42,
            emoji: '🎷',
            cards: [{
                id: 1,
                word: 'comer',
                translation: 'to eat',
            },{
                id: 2,
                word: 'beber',
                translation: 'to drink',
            },{
                id: 3,
                word: 'bailar',
                translation: 'to dance',
            },{
                id: 4,
                word: 'cantar',
                translation: 'to sing',
            },{
                id: 5,
                word: 'tocar',
                translation: 'to play',
            },{
                id: 6,
                word: 'hacer',
                translation: 'to make',
            },{
                id: 7,
                word: 'estar',
                translation: 'to be',
            }],
        },{
            id: 2,
            title: 'Sailing',
            count: 10,
            emoji: '⛵️',
        },{
            id: 3,
            title: 'Food and drink',
            count: 96,
            emoji: '🥑',
        },{
            id: 4,
            title: 'Animals',
            count: 59,
            emoji: '🐳',
        }],
        userName: 'Lukasz',
    },
    mutations: {
    },
    getters: {
        getListById: state => id => {
            return state.lists.find(list => list.id === id)
        }
    }
})

export {
    store
}
