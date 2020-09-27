import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUser, updateUser } from '../redux/actions/user'
import Alert from './Alert'
import { errorIcon, successIcon } from '../utils'
import './UpdateVote.css'

const UpdateVote = ({
  setShowUpdateModal,
  userId,
  userReducer,
  getUser,
  updateUser,
}) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const { userData, errorMessage, successMessage } = userReducer

  useEffect(() => {
    getUser(userId)
  }, [])

  useEffect(() => {
    if (userData) {
      setName(userData.name)
      setUsername(userData.username)
      setIsAdmin(userData.isAdmin)
    }
  }, [userData])

  const body = { name, username, isAdmin }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser(userId, body)
  }

  return (
    <div className='updateVote'>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <Alert alert='error' icon={errorIcon} message={errorMessage} />
        )}
        {successMessage && (
          <Alert alert='success' icon={successIcon} message={successMessage} />
        )}
        <h3>Update Voters</h3>
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
          <button type='submit'>Update</button>
          <button onClick={() => setShowUpdateModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userReducer: state.user,
})

export default connect(mapStateToProps, { getUser, updateUser })(UpdateVote)
