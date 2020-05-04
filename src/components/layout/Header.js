import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../actions/auth.js'

class Header extends Component {
    render() {
            if(this.props.auth.isAuthenticated) {
                return (
              <nav className="navbar navbar-expand-sm navbar-light bg-light">
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Link to="/" className="navbar-brand" >Course store</Link>
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                      <Link to="/createProduct" className="btn btn-primary mr-3 ">
                        Create Product
                      </Link>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-dark" onClick ={this.props.logOut}>
                             Logout
                        </button>
                    </li>  
                </ul>
              </div>
            </nav>
            )

            } else {
                return (
              <nav className="navbar navbar-expand-sm navbar-light bg-light">
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Link to="/" className="navbar-brand" >Course store</Link>
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                    </li>
                </ul>
              </div>
            </nav>
            )

        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logOut})(Header)
