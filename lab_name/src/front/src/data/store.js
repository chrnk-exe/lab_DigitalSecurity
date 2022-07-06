import { createStore, combineReducers } from 'redux'
import { articlesReducer } from './articlesReducer'

let rootReducer = combineReducers({
    articles: articlesReducer
})

export const store = createStore(rootReducer)