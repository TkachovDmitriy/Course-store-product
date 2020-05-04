import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios' 
import {USER_LOADED} from './actions/types.js'

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Header from './components/layout/Header'
import Products from './components/dashboard/Products'
import CreateProduct from './components/dashboard/CreateProduct'
import ChangeProduct from './components/dashboard/ChangeProduct.js'
import Image from './components/dashboard/ImageSet.js'
import Login from './components/accounts/Login'
import Alert from './components/layout/Alerts.js'

import Register from './components/accounts/Register'
import PrivateRoute from './components/common/PrivateRoute'

import { Provider } from 'react-redux'
import { logOut  } from './actions/auth.js'
import store from './store.js'
import jwtDecode from 'jwt-decode'

//Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'top center'
}

const token = localStorage.FBIdToken
if (token) {
    const decodedToken = jwtDecode(token)
    console.log(decodedToken)
    if(decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logOut())
        window.location.href = '/login'
    } else {
        store.dispatch({type: USER_LOADED})
        axios.defaults.headers.common['Athorization'] = token
    }
}

class App extends Component{
    render () { 
      return (
          <Provider store={store}>
           <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Router>
                 <Fragment>
                     <Header />
                        <Alert />
                        <div className="container">
                            <Switch>
                                <PrivateRoute exact path="/" component={Products} />
                                <PrivateRoute exact path="/createProduct" component={CreateProduct} />
                                <PrivateRoute exact path="/changeProduct"  component={ChangeProduct} />
                                <PrivateRoute exact path="/setImage"  component={Image} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        </div>  
                 </Fragment>
             </Router>
          </AlertProvider>
        </Provider>
      ) 
    }
}

export default App;
