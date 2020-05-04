const functions = require('firebase-functions');

const firebase = require('firebase')
const express = require('express')
const app = express()

const FBAuth = require('./util/fbAuth')

const { getAllProducts, postOneProduct, deleteOneProduct, changedOneProduct } = require('./handlers/products')
const { signUp, logIn, uploadImage } = require('./handlers/users')



//routes product
app.get('/products',  getAllProducts)
app.post('/product', FBAuth, postOneProduct)
app.post('/product/:id/image', FBAuth, uploadImage)
app.delete('/product/:id', FBAuth, deleteOneProduct)
app.post('/product/change/:id', FBAuth, changedOneProduct)

//routes users
app.post('/signup', signUp)
app.post('/login', logIn)



exports.api = functions.https.onRequest(app) 
