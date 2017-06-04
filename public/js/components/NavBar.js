import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import SearchBar from './SearchBar.js'
import Login from './Login.js'
import Logout from './Logout.js'
import { loginUser, logoutUser } from '../actions'
import {deepPurple400} from 'material-ui/styles/colors'

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
      <Login
        errorMessage={errorMessage}
        onLoginClick={creds => dispatch(loginUser(creds))}
      />
    );

    if (isAuthenticated) {
      loginButton = null;
      // (
      //   <Logout onLogoutClick={() => dispatch(logoutUser())} />
      // )
    }

    return (
      <AppBar
        title='VinylCache'
        titleStyle={{fontSize: 24, color: deepPurple400}}
        style={{position: 'fixed'}}
        showMenuIconButton={false}
        iconElementRight={<SearchBar onUserInput={this.handleUserInput.bind(this)} />}
      >
        { loginButton }
      </AppBar>
    );
  }
}

export default NavBar
