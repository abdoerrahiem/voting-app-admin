import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../redux/actions/user'
import Alert from '../components/Alert'
import { errorIcon } from '../utils'
import './Login.css'

const Login = ({ login, userReducer }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { error, isAdmin } = userReducer

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
    setUsername('')
    setPassword('')
  }

  if (isAdmin) return <Redirect to='/' />

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        {error && <Alert alert='error' icon={errorIcon} message={error} />}
        <h3>Login Admin</h3>
        <div>
          <i className='fas fa-user' />
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <i className='fas fa-lock' />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>
          <i className='fas fa-sign-in-alt' /> Login
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userReducer: state.user,
})

export default connect(mapStateToProps, { login })(Login)
