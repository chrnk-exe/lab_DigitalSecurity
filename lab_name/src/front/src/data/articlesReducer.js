let initialState = {
    articles: []
}

const SET_ARTICLES = 'setArticles'

export const articlesReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ARTICLES:
            return {...state, articles: action.payload}
        default:
            return state
    }
}

export const setArticlesRedux = payload => ({type: SET_ARTICLES, payload})