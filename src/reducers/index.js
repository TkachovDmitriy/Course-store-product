import { combineReducers } from 'redux'
import products from './products.js'
import errors from './erors.js'
import message from './messages.js'
import auth  from './auth.js'

export default combineReducers({
    products,
    errors,
    auth,
    message
})
