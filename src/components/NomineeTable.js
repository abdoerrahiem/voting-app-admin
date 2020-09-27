import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  deleteNominee,
  addPhotoChairman,
  addPhotoViceChairman,
} from '../redux/actions/nominee'
import Alert from './Alert'
import { imageTypes, successIcon, errorIcon } from '../utils'
import { projectFirestore, projectStorage } from '../firebase'
import AddNominee from './AddNominee'
import './NomineeTable.css'

const NomineeTable = ({
  nominees,
  deleteNominee,
  nomineeReducer,
  addPhotoChairman,
  addPhotoViceChairman,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [nomineeId, setNomineeId] = useState('')
  const [error, setError] = useState(null)
  const { successMessage } = nomineeReducer

  const handleRemove = (nomineeId) => {
    deleteNominee(nomineeId)
  }

  const handleNomineePhoto = (e, id) => {
    const inputName = e.target.name
    const selectedFile = e.target.files[0]
    if (selectedFile && imageTypes.includes(selectedFile.type)) {
      setError(null)
      const storageRef = projectStorage.ref(selectedFile.name)
      const collectionRef = projectFirestore.collection('images')

      storageRef.put(selectedFile).on('state_changed', async () => {
        const url = await storageRef.getDownloadURL()
        collectionRef.add({ url })
        if (inputName === 'chairman') {
          addPhotoChairman(id, url)
        } else {
          addPhotoViceChairman(id, url)
        }
      })
    }
  }

  return (
    <>
      {showUpdateModal && (
        <AddNominee
          setShowUpdateModal={setShowUpdateModal}
          nomineeId={nomineeId}
        />
      )}

      {successMessage && (
        <Alert alert='success' icon={successIcon} message={successMessage} />
      )}
      {error && <Alert alert='error' icon={errorIcon} message={error} />}
      <table className='table'></table>
      <table className='table'>
        <tr>
          <td>No</td>
          <td>Ketua</td>
          <td>Wakil Ketua</td>
          <td>Action</td>
        </tr>
        {nominees.map((nominee, index) => (
          <tr key={nominee._id} className='table__nominee'>
            <td>{index + 1}</td>
            <td>
              <img src={nominee.photoOfChairman} alt='chairman' />
              <div className='upload-btn-wrapper'>
                <button className='btn'>Change Photo</button>
                <input
                  type='file'
                  name='chairman'
                  onChange={(e) => handleNomineePhoto(e, nominee._id)}
                />
              </div>
              <p>{nominee.nameOfChairman}</p>
            </td>
            <td>
              <img src={nominee.photoOfViceChairman} alt='vice chairman' />
              <div className='upload-btn-wrapper'>
                <button className='btn'>Change Photo</button>
                <input
                  type='file'
                  name='viceChairman'
                  onChange={(e) => handleNomineePhoto(e, nominee._id)}
                />
              </div>
              <p>{nominee.nameOfViceChairman}</p>
            </td>
            <td className='icons'>
              <i
                className='fas fa-user-edit'
                title='Edit'
                onClick={() => {
                  setShowUpdateModal(true)
                  setNomineeId(nominee._id)
                }}
              />
              <i
                className='fas fa-user-times'
                title='Remove'
                onClick={() => handleRemove(nominee._id)}
              />
            </td>
          </tr>
        ))}
      </table>
    </>
  )
}

const mapStateToProps = (state) => ({
  nomineeReducer: state.nominee,
})

export default connect(mapStateToProps, {
  deleteNominee,
  addPhotoChairman,
  addPhotoViceChairman,
})(NomineeTable)
