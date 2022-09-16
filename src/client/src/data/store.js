import { configureStore } from '@reduxjs/toolkit';
import { articlesReducer } from '../reducers/articlesReducer';
import { userReducer } from '../reducers/userReducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
        articles: articlesReducer,
    },
});
