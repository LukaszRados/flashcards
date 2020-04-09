import { mutations, getters, actions } from './index'

const emptyState = {
    lists: [],
    cards: {},
    notification: null,
    user: '',
    token: '',
}

const dummyCards = [1, 2, 3]

const cardsState = {
    cards: {
        1: dummyCards
    }
}

const dummyNotification = {
    text: 'It was a success',
    type: 'success',
}

jest.useFakeTimers()

describe('Mutations', () => {
    describe('Lists', () => {
        test('updateLists updates list with a new one', () => {
            const state = { ...emptyState }
            const lists = {
                1: {
                    cards: []
                }
            }
            mutations.updateLists(state, lists)
            expect(state.lists).toBe(lists)
        })
    })

    describe('Cards', () => {
        test('updateCards updates cards for a new list', () => {
            const state = { ...emptyState }
            const cards = [{}, {}]
            const listId = 1
            mutations.updateCards(state, { listId, cards })
            expect(state.cards[listId]).toBe(cards)
        })

        test('updateCards updates cards for an existing list', () => {
            const state = { ...emptyState }
            const cards = [{}, {}]
            const listId = 1
            mutations.updateCards(state, { listId, cards })
            expect(state.cards[listId]).toBe(cards)
        })
    })

    describe('Notification', () => {
        test('setNotification sets a notification', () => {
            const state = { ...emptyState }
            mutations.setNotification(state, dummyNotification)
            expect(state.notification).toBe(dummyNotification)
        })

        test('clearNotification removes notification', () => {
            const state = { ...emptyState }
            mutations.clearNotification(state)
            expect(state.notification).toBe(null)
        })
    })

    describe('User', () => {
        test('setUser sets user and token', () => {
            const fakeUser = {
                username: 'admin',
                token: '012afd22'
            }
            const state = { ...emptyState }
            mutations.setUser(state, fakeUser)
            expect(state.user).toBe(fakeUser.username)
            expect(state.token).toBe(fakeUser.token)
        })

        test('logout removes user and token', () => {
            const state = { ...emptyState }
            mutations.logout(state)
            expect(state.user).toBe('')
            expect(state.token).toBe('')
        })
    })
})

describe('Getters', () => {
    test('getCardsInRandomOrder returns an empty array if non-existing list id passed', () => {
        const state = { ...cardsState }
        expect(getters.getCardsInRandomOrder(state)(4)).toEqual([])
    })

    test('getCardsInRandomOrder returns cards from a list', () => {
        const state = { ...cardsState }
        expect(getters.getCardsInRandomOrder(state)(1)).toBe(dummyCards)
    })
})

// describe('Actions', () => {
//     test('fetchLists gets lists and stores them', () => {
//         const commit = jest.fn()
//         await actions.fetchLists({ commit })

//         expect(url).toBe('http://localhost:3000/lists')
//         expect(commit).toHaveBeenCalled('updateLists')
//     })
// })
