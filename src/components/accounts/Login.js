import React, { Component} from 'react';
import { Link }  from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth.js'

export class Login extends Component {
    state = {
        email: "",
        password:"",
        errors: {},
    }

    onSubmit = e => {
        e.preventDefault()
        console.log('Submit')
        const { email,  password } = this.state
        const userData = { email, password }
        this.props.login(userData, this.props.history)

    }

    onChange = e => this.setState({ [e.target.name]:e.target.value })

     render() {
         const { email,  password } = this.state
         return (
            <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.onSubmit}>
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
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p>
              Dont have account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div> 
                
            
        )
     }
}

export default connect(null, { login })(Login)
