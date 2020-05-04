import axios from 'axios'
import { returnErrors } from './messages.js'

import { USER_LOADED, USER_LOADING, GET_ERRORS } from './types.js'


export const login = (userData, history) => async  (dispatch) => {
    try{
       let res =  await axios.post('/login', userData)
        setAuthorizationHeaders(res.data.token)

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        history.push('/')
     } catch (err) {
         console.log(err.response.data )
         dispatch(returnErrors(err.response.data, err.response.status ))
             
     }
    }

export const logOut = () => async  (dispatch) => {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Athorization']
    dispatch({
        type:USER_LOADING
    })
}

export const signUp = (userData, history) => async  (dispatch) => {
    try{
       let res =  await axios.post('/signup', userData)
        setAuthorizationHeaders(res.data.token)

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        history.push('/')
     } catch (err) {
         dispatch(returnErrors(err.response.data, err.response.status))
         console.log(err.response)
             
     }
    }

const setAuthorizationHeaders = (token) => {
        const FBIdToken = `Bearer ${token}`
        localStorage.setItem('FBIdToken', FBIdToken)
        axios.defaults.headers.common['Athorization'] = FBIdToken
}
