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

    return (
      <nav className="nav navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">VinylCache</a>
          <SearchBar onUserInput={this.handleUserInput.bind(this)} />
          {!isAuthenticated &&
            <Login errorMessage={errorMessage}
                   onLoginClick={creds => dispatch(loginUser(creds))}
            />
          }
          {isAuthenticated &&
            <Logout onLogoutClick={() => dispatch(logoutUser())} />
          }
        </div>
      </nav>
    );
  }
}

export default NavBar
