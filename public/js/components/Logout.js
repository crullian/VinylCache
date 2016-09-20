import React, { Component, PropTypes } from 'react'

class Logout extends Component {

  static propTypes = {
    onLogoutClick: PropTypes.func.isRequired
  }
  
  render() {
    const { onLogoutClick } = this.props
    
    return(
      <button onClick={() => onLogoutClick()} className="btn btn-primary">
        Logout
      </button>
    )
  }
}

export default Logout