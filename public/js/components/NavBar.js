import React, { Component, PropTypes } from 'react'
import SearchBar from './SearchBar.js'
import Login from './Login.js'
import Logout from './Logout.js'
import { loginUser, logoutUser } from '../actions'

class NavBar extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
  }

  handleUserInput(filterText) {
    return this.props.setSearchInput(filterText);
  }

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props

    let loginButton = (
      <Login errorMessage={errorMessage}
             onLoginClick={creds => dispatch(loginUser(creds))} />
    );

    if (isAuthenticated) {
      loginButton = (
        <Logout onLogoutClick={() => dispatch(logoutUser())} />
      )
    }

    return (
      <nav className="nav navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">VinylCache</a>
          { loginButton }
          <SearchBar onUserInput={this.handleUserInput.bind(this)} />
        </div>
      </nav>
    );
  }
}

export default NavBar
