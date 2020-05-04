import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


export class Alerts extends Component {

    static propTypes = {
    }

    componentDidUpdate(prevProps) { 

        console.log('PREV', prevProps)
        console.log('PREV', this.props.error)
        const { errors, alert, message, error }  = this.props
        if (error !== prevProps.error) {
            if (error.general) alert.error(`${error.general}`) 
            if (error.error) alert.error(`${error.error}`) 
            if (error.email) alert.error(`${error.email}`) 
            if (error.password) alert.error(`Password ${error.password}`) 
            if (error.handle) alert.error(`Handle ${error.handle}`) 
        }
       if (message !== prevProps.message) {
           console.log(message)
           if (message.deleteProduct) alert.success(message.deleteProduct) 
           if (message.addProduct) alert.success(message.addProduct) 
           if (message.changeProduct) alert.success(message.changeProduct) 
        }
    }

    

    render() {
        return  <Fragment /> 
    }
}

const mapStateToProps = state => ({
    error: state.errors.msg,
    status: state.errors.status,
    message: state.message
})

export default connect(mapStateToProps)(withAlert()(Alerts))
