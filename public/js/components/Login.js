import React, { Component, PropTypes } from 'react'

class Login extends Component {

  static propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  }

  handleClick(e) {
    e.preventDefault()
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    if(!creds.username || !creds.password) {
      return;
    }
    this.props.onLoginClick(creds)
  } 

  render() {
    const { errorMessage } = this.props

    return (
      <form className="navbar-form pull-right" name="loginSubmit" onSubmit={this.handleClick.bind(this)}>
        <input type='text' required ref='username' className="form-control" placeholder='Username'/>
        <input type='password' required ref='password' className="form-control" placeholder='Password'/>
        <button className="btn btn-info" type="submit" value="Post">
          Login
        </button>

        {errorMessage &&
          <p>{errorMessage}</p>
        }
      </form>
    )
  }
}

export default Login