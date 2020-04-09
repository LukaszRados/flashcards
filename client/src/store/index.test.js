import { mutations, getters } from './index'

const emptyState = {
    lists: [],
    cards: {},
}

const dummyCards = [1, 2, 3]

const cardsState = {
    cards: {
        1: dummyCards
    }
}

describe('MUTATIONS', () => {
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

describe('GETTERS', () => {
    test('getCardsInRandomOrder returns an empty array if non-existing list id passed', () => {
        const state = { ...cardsState }
        expect(getters.getCardsInRandomOrder(state)(4)).toEqual([])
    })

    test('getCardsInRandomOrder returns cards from a list', () => {
        const state = { ...cardsState }
        expect(getters.getCardsInRandomOrder(state)(1)).toBe(dummyCards)
    })
})
