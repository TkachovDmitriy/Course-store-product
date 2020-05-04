import React, { Component, Fragment } from 'react';
import { Link }  from 'react-router-dom'

import { connect } from 'react-redux'
import { signUp } from '../../actions/auth.js'

export class Register extends Component {
    state = {
        handle: "",
        email:"",
        password:"",
        confirmPassword:"",
    }

    onSubmit = e => {
        e.preventDefault()
        const { email,  password, confirmPassword, handle } = this.state
        const userData = { email, password, confirmPassword, handle }
        this.props.signUp(userData, this.props.history)
    }

    onChange = e => this.setState({ [e.target.name]:e.target.value })

     render() {
         const { handle, email, password, confirmPassword } = this.state
         return (
            <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Handle</label>
              <input
                type="text"
                className="form-control"
                name="handle"
                placeholder="Key"
                onChange={this.onChange}
                value={handle}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                onChange={this.onChange}
                value={confirmPassword}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div> 
                
            
        )
     }
}

export default connect(null, { signUp })(Register)
