let storage = JSON.parse(window.sessionStorage.getItem('articles'))

let initialState = {
    articles: storage === null ? [] : storage,
    currentArticle: {},
    comments: undefined
}

const SET_ARTICLES = 'setArticles'
const SET_COMMENTS = 'setComments'
const SET_ARTICLE_STATE = 'setArticleState'

export const articlesReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ARTICLES:
            return {...state, articles: action.payload}
        case SET_COMMENTS:
            return {...state, comments: action.payload}
        case SET_ARTICLE_STATE:
            return {...state, currentArticle: action.payload.articles, comments: action.payload.comments}
        default:
            return state
    }
}

export const setArticlesRedux = payload => ({type: SET_ARTICLES, payload})
export const setComments = payload => ({type: SET_COMMENTS, payload})
export const setArticleState = payload => ({type: SET_ARTICLE_STATE, payload})
