import { createReducer, createAction } from '@reduxjs/toolkit';

const initialState = {
    user: '',
    name: '',
    id: -1,
    flag: '',
};

export const setUser = createAction('setUser');
export const setAdmin = createAction('setAdmin');
export const setUserName = createAction('setUserName');

export const userReducer = createReducer(initialState, builder => {
    builder.addCase(setUser, (state, action) => {
        const { name, id } = action.payload;
        return {
            ...state,
            user: 'user',
            name,
            id,
        };
    });
    builder.addCase(setAdmin, (state, action) => {
        const { name, id, flag } = action.payload;
        return {
            ...state,
            user: 'admin',
            name,
            id,
            flag,
        };
    });
    builder.addCase(
        setUserName,
        (state, action) => {
            state.name = action.payload
        },
    );
});
