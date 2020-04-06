import { mutations, getters } from './index'

const emptyState = {
    lists: [],
    cards: {},
}

const dummyCards = [1, 2, 3]

const cardsState = {
    cards: {
        1: {
            cards: dummyCards
        }
    }
}

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

test('getCards returns an empty array if non-existing list id passed', () => {
    const state = { ...cardsState }
    expect(getters.getCards(state)(4)).toEqual([])
})

test('getCards returns cards from a list', () => {
    const state = { ...cardsState }
    expect(getters.getCards(state)(1).cards).toBe(dummyCards)
})
