import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../redux/actions/user'
import Alert from '../components/Alert'
import { errorIcon, successIcon } from '../utils'
import './AddVoter.css'

const AddVoter = ({ setShowModal, createUser, userReducer }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const { successMessage, errorMessage } = userReducer

  const handleSubmit = (e) => {
    e.preventDefault()
    createUser({ name, username, password, isAdmin })
  }

  return (
    <div className='addVoter'>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <Alert alert='error' icon={errorIcon} message={errorMessage} />
        )}
        {successMessage && (
          <Alert alert='success' icon={successIcon} message={successMessage} />
        )}
        <h3>Add Voters</h3>
        <div>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <select
            value={isAdmin}
            onChange={(e) =>
              setIsAdmin(e.target.value === 'true' ? true : false)
            }
          >
            <option value={false}>User</option>
            <option value={true}>Admin</option>
          </select>
        </div>
        <div>
          <button type='submit'>Save</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userReducer: state.user,
})

export default connect(mapStateToProps, { createUser })(AddVoter)
