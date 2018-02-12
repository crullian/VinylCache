import React, { Component, PropTypes } from 'react'
import SearchBar from './SearchBar.js'
import Login from './Login.js'
import Logout from './Logout.js'
import { loginUser, logoutUser } from '../actions'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import {deepPurple400} from 'material-ui/styles/colors'

class NavBar extends Component {
  state = {
    isDrawerOpen: false
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
  }

  handleDrawerOpen = () => {
    this.setState({isDrawerOpen: true});
  }

  handleDrawerClose = () => {
    this.setState({isDrawerOpen: false})
  }

  handleMenuTap = () => {
    console.log('CLICKED MENU')
    this.handleDrawerOpen();
  }

  handleUserInput = (filterText) => {
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
        iconElementLeft={
          <IconButton onTouchTap={this.handleMenuTap}>
            <Menu color={deepPurple400} />
          </IconButton>
        }
        iconElementRight={<SearchBar onUserInput={this.handleUserInput} />}
      >
        <Drawer
          docked={false}
          open={this.state.isDrawerOpen}
          onRequestChange={this.handleDrawerClose}
        >
          { loginButton }
        </Drawer>
      </AppBar>
    );
  }
}

export default NavBar
