import React, { Component, PropTypes } from 'react'

class Logout extends Component {

  static propTypes = {
    onLogoutClick: PropTypes.func.isRequired
  }
  
  logOut(e) {
    e.preventDefault()
    return this.props.onLogoutClick()
  }

  render() {
    
    return(
      <form className="navbar-form pull-right">
        <button onClick={this.logOut.bind(this)} className="btn btn-primary">
          Logout
        </button>
      </form>
    )
  }
}

export default Logout