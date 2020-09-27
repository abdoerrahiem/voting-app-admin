import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { removeUser, updateUserPhoto } from '../redux/actions/user'
import Alert from './Alert'
import { successIcon, imageTypes, errorIcon } from '../utils'
import UpdateVote from './UpdateVote'
import { projectFirestore, projectStorage } from '../firebase'
import './Table.css'

const Table = ({ usersData, removeUser, userReducer, updateUserPhoto }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [userId, setUserId] = useState('')
  const { successMessage } = userReducer
  const [error, setError] = useState(null)

  const handleRemove = (userId) => {
    removeUser(userId)
  }

  const handlePhotoSubmit = (e, id) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && imageTypes.includes(selectedFile.type)) {
      setError(null)
      const storageRef = projectStorage.ref(selectedFile.name)
      const collectionRef = projectFirestore.collection('images')

      storageRef.put(selectedFile).on('state_changed', async () => {
        const url = await storageRef.getDownloadURL()
        collectionRef.add({ url })
        updateUserPhoto(id, url)
      })
    } else {
      setError('Format picture tidak valid.')
    }
  }

  return (
    <>
      {showUpdateModal && (
        <UpdateVote setShowUpdateModal={setShowUpdateModal} userId={userId} />
      )}
      {successMessage && (
        <Alert alert='success' icon={successIcon} message={successMessage} />
      )}
      {error && <Alert alert='error' icon={errorIcon} message={error} />}
      <table className='table'>
        <tr>
          <td>No</td>
          <td>Name</td>
          <td>Username</td>
          <td>Photo</td>
          <td>Admin</td>
          <td>Action</td>
        </tr>
        {usersData.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td className='center'>
              <img src={user.photo} alt='user' />
              <div className='upload-btn-wrapper'>
                <button className='btn'>Change Photo</button>
                <input
                  type='file'
                  name='myfile'
                  onChange={(e) => handlePhotoSubmit(e, user._id)}
                />
              </div>
            </td>
            <td className='center'>{user.isAdmin ? 'Yes' : 'No'}</td>
            <td className='icons'>
              <i
                className='fas fa-user-edit'
                title='Edit'
                onClick={() => {
                  setShowUpdateModal(true)
                  setUserId(user._id)
                }}
              />
              <i
                className='fas fa-user-times'
                title='Remove'
                onClick={() => handleRemove(user._id)}
              />
            </td>
          </tr>
        ))}
      </table>
    </>
  )
}

const mapStateToProps = (state) => ({
  userReducer: state.user,
})

export default connect(mapStateToProps, { removeUser, updateUserPhoto })(Table)
