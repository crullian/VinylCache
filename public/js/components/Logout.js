import React, { Component, PropTypes } from 'react'

class Logout extends Component {

  static propTypes = {
    onLogoutClick: PropTypes.func.isRequired
  }
  
  render() {
    const { onLogoutClick } = this.props
    
    return(
      <form className="navbar-form pull-right">
        <button onClick={() => onLogoutClick()} className="btn btn-primary">
          Logout
        </button>
      </form>
    )
  }
}

export default Logout