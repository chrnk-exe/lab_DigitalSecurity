// let storage = JSON.parse(window.sessionStorage.getItem('user'))
let storage = null

let initialState = storage === null ? {
    user: 'user', //'unknown',
    name: 'unknown',
    id: -1
}
: {
    user: storage?.user, //'unknown',
    name: storage?.name,
    id: storage?.id,
    flag: ''
}

const SET_USER = 'setUser'
const SET_ADMIN = 'setAdmin'
const SET_USER_NAME = 'setUserName'

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER:
            return {...state, user: 'user', name: action.payload.name, id: action.payload.id}
        case SET_ADMIN:
            return {...state, user: 'admin', name: action.payload.name, id: action.payload.id, flag: action.payload.flag}
        case SET_USER_NAME:
            return {...state, name: action.payload}
        default:
            return state
    }
}

export const setUser = payload => ({type: SET_USER, payload})
export const setAdmin = payload => ({type: SET_ADMIN, payload})
export const setUserName = payload => ({type: SET_USER_NAME, payload})
