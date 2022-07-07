let initialState = {
    user: 'unknown'
}

const SET_USER = 'setUser'
const SET_ADMIN = 'setAdmin'

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER:
            return {...state, user: 'user'}
        case SET_ADMIN:
            return {...state, user: 'admin'}
        default:
            return state
    }
}

export const setUser = () => ({type: SET_USER})
export const setAdmin = () => ({type: SET_ADMIN})
