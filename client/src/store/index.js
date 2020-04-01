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
            cards: null,
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
    }
})

export {
    store
}
