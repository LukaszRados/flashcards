import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        lists: [{
            id: 1,
            title: 'Verbs',
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
            emoji: '⛵️',
            cards: [{
                id: 1,
                word: 'navegar',
                translation: 'to sail',
            },{
                id: 8,
                word: 'el barco',
                translation: 'the ship',
            },{
                id: 9,
                word: 'el velero',
                translation: 'the sailboat',
            },{
                id: 10,
                word: 'amarrar',
                translation: 'to moor',
            },]
        },{
            id: 3,
            title: 'Food and drink',
            emoji: '🥑',
            cards: [{
                id: 11,
                word: 'el aguacate',
                translation: 'avocado',
            }, {
                id: 12,
                word: 'el platano',
                translation: 'banana',
            }, {
                id: 13,
                word: 'el agua',
                translation: 'water',
            }, {
                id: 14,
                word: 'el zumo de naranja',
                translation: 'orange juice',
            }, {
                id: 15,
                word: 'la carne de vaca',
                translation: 'beef',
            }]
        },{
            id: 4,
            title: 'Animals',
            emoji: '🐳',
            cards: [{
                id: 16,
                word: 'el elefante',
                translation: 'elephant',
            }, {
                id: 17,
                word: 'el leon',
                translation: 'lion',
            }, {
                id: 18,
                word: 'el pajaro',
                translation: 'parrot',
            }]
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
