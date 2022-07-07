let initialState = {
    articles: [],
    comments: []
}

const SET_ARTICLES = 'setArticles'
const SET_COMMENTS = 'setComments'

export const articlesReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ARTICLES:
            return {...state, articles: action.payload}
        case SET_COMMENTS:
            return {...state, comments: action.payload}
        default:
            return state
    }
}

export const setArticlesRedux = payload => ({type: SET_ARTICLES, payload})
export const setComments = payload => ({type: SET_COMMENTS, payload})
