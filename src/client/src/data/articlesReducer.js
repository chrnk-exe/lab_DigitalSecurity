let initialState = {
    articles: [],
    currentArticle: {},
    comments: undefined,
    maxArticles: 1
}

const SET_ARTICLES = 'setArticles'
const SET_COMMENTS = 'setComments'
const SET_ARTICLE_STATE = 'setArticleState'

export const articlesReducer = (state = initialState, action) => {
    let articles, comments, maxArticles
    if(action.payload){
        ({articles, comments, maxArticles} = action.payload)
    }
    switch(action.type){
        case SET_ARTICLES:
            return {...state, articles: articles, maxArticles: maxArticles}
        case SET_COMMENTS:
            return {...state, comments: action.payload}
        case SET_ARTICLE_STATE:
            return {...state, currentArticle: articles, comments: comments, maxArticles: maxArticles}
        default:
            return state
    }
}

export const setArticlesRedux = payload => ({type: SET_ARTICLES, payload})
export const setComments = payload => ({type: SET_COMMENTS, payload})
export const setArticleState = payload => ({type: SET_ARTICLE_STATE, payload})
