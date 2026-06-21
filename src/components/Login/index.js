import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    // Set the cookie exactly as required
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state

    // If the user is already logged in, redirect them away from the login page
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        {/* Landing Image */}
        <img
          src="https://res.cloudinary.com/dpudcurwt/image/upload/v1781682410/ceff20e8367d1981f2a409a617ac848670d29c7e_res7us.jpg"
          alt="website login"
          className="login-image"
        />

        {/* Form Container */}
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/dpudcurwt/image/upload/v1781943535/logo_jtmsn3.png"
                alt="website logo"
                className="website-logo"
              />
              <h1 className="logo-text">Tasty Kitchens</h1>
            </div>

            <h1 className="login-heading">Login</h1>

            <div className="input-container">
              <label className="input-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input-field"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>

            {showSubmitError && <p className="error-message">{errorMsg}</p>}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
