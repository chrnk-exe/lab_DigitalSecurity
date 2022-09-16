import { createReducer, createAction } from '@reduxjs/toolkit';

let initialState = {
    articles: [],
    currentArticle: {},
    comments: undefined,
    maxArticles: 1,
};

export const setArticlesRedux = createAction('setArticles');
export const setComments = createAction('setComments');
export const setArticleState = createAction('setArticleState');

export const articlesReducer = createReducer(initialState, builder => {
    builder.addCase(setArticlesRedux, (state, action) => {
        const { articles, maxArticles } = action.payload;
        return {
            ...state,
            articles,
            maxArticles,
        };
    });
    builder.addCase(
        setComments,
        (state, action) => {
            state.comments = action.payload
        },
    );
    builder.addCase(setArticleState, (state, action) => {
        const { articles, comments, maxArticles } = action.payload;
        return {
            ...state,
            currentArticle: articles,
            comments,
            maxArticles,
        };
    });
});
