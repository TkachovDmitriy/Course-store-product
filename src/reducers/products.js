import { GET_PRODUCTS, DELETE_PRODUCT, ADD_PRODUCT, SAVE_ID_PRODUCT , IMAGE_UPLOAD} from '../actions/types.js'

const initialState ={
    products: []
 }

export default function ( state=initialState, action) {
     switch(action.type) {
        case GET_PRODUCTS:
             return {
                ...state,
                 products: action.payload
                 
            }
        case DELETE_PRODUCT:
             return {
                ...state,
                 products: state.products.filter(product => product.id !== action.payload)
                 
             }
         case ADD_PRODUCT:
             return {
                 ...state,
                                  
             }
        case SAVE_ID_PRODUCT:
             return {
                 ...state,
                 productId: action.payload
             }
            case IMAGE_UPLOAD: 
             return {
                 ...state,
                 imageUrl: action.payload
             }
        default :
             return state
     }
}
