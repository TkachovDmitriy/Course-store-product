import axios from 'axios'

import { GET_PRODUCTS, DELETE_PRODUCT, ADD_PRODUCT,  SAVE_ID_PRODUCT, CHANGE_PRODUCT, IMAGE_UPLOAD } from './types.js'
import { createMessage } from './messages.js'

//GET_ERRORS
export const getAllProducts = () => async  (dispatch, getState) => {
    try{
       let res = await axios.get('/products')
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        })
    }
    catch (err){
        console.log(err)
    }
}
export const deleteOneProduct = (id) =>  (dispatch) => {
    const token = localStorage.getItem('FBIdToken')
    axios.defaults.headers.common['Authorization'] = token
    axios.delete(`/product/${id}`)
        .then( (res) => {
            console.log(res)
            dispatch(createMessage({ deleteProduct: 'Product Delete' }))
            dispatch({ type: DELETE_PRODUCT, payload: id})
           dispatch(getAllProducts())     
        } )
        .catch( err => {
            console.log(err.response)
        })
}

export const addProduct = (productData, history) => async (dispatch) => {
    try {
        const token = localStorage.getItem('FBIdToken')
        axios.defaults.headers.common['Authorization'] = token

        const res = await axios.post('/product', productData)
        dispatch(createMessage({ addProduct: 'Product Added' }))
        dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        })
        history.push('/')
    } catch ( err) { console.log(err.response)}
}

export const changeProduct = (id, productData, history) => async dispatch => {
    try{
        const token = localStorage.getItem('FBIdToken')
        axios.defaults.headers.common['Authorization'] = token
        const res = await axios.post(`/product/change/${id}`, productData)
        dispatch(createMessage({ changeProduct: 'Product Changed' }))
        dispatch({ type: CHANGE_PRODUCT, payload: res.data})
        history.push('/')
        
    } catch ( err) {
        console.log(err.response)
    } 
}

export const uploadImage = (id, formData, history) => async  (dispatch) => {
    try{
        const token = localStorage.getItem('FBIdToken')
        axios.defaults.headers.common['Authorization'] = token
        const res = await axios.post(`/product/${id}/image`, formData)
        dispatch({ type: IMAGE_UPLOAD, payload: res.data})
        dispatch(getAllProducts())
        history.push('/')
    } catch ( err){ console.log(err.response) }
}

export const saveIdProduct = (id) => dispatch => {
    dispatch({
        type:SAVE_ID_PRODUCT,
        payload: id
    })
}
