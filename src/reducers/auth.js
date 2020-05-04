import { USER_LOADING, USER_LOADED, AUTH_ERROR  } from '../actions/types.js'

const initialState = {
    token: localStorage.getItem('FBIdToken'),
    isAuthenticated: false,
    isLoading: false,
    user: null
}


export default function ( state=initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isAuthenticated:false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case AUTH_ERROR:
                
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state
    }
}
