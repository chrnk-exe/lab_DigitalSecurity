import { createStore, combineReducers } from 'redux'
import { articlesReducer } from './articlesReducer'
import { userReducer } from './userReducer'

let rootReducer = combineReducers({
    articles: articlesReducer,
    user: userReducer
})

export const store = createStore(rootReducer)