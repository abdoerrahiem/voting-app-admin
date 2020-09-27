import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  createNominee,
  updateNominee,
  getNominee,
} from '../redux/actions/nominee'
import Alert from '../components/Alert'
import { errorIcon, successIcon } from '../utils'
import './AddNominee.css'

const AddNominee = ({
  setShowModal,
  setShowUpdateModal,
  nomineeId,
  nomineeReducer,
  createNominee,
  getNominee,
  updateNominee,
}) => {
  const [nameOfChairman, setNameOfChairman] = useState('')
  const [nameOfViceChairman, setNameOfViceChairman] = useState('')
  const [birthdayOfChairman, setBirthdayOfChairman] = useState('')
  const [birthdayOfViceChairman, setBirthdayOfViceChairman] = useState('')
  const [addressOfChairman, setAddressOfChairman] = useState('')
  const [addressOfViceChairman, setAddressOfViceChairman] = useState('')
  const [experienceOfChairman, setExperienceOfChairman] = useState('')
  const [experienceOfViceChairman, setExperienceOfViceChairman] = useState('')
  const [visionAndMission, setVisionAndMission] = useState('')
  const [motto, setMotto] = useState('')
  const { successMessage, errorMessage, gotNominee } = nomineeReducer

  const body = {
    nameOfChairman,
    nameOfViceChairman,
    birthdayOfChairman,
    birthdayOfViceChairman,
    addressOfChairman,
    addressOfViceChairman,
    experienceOfChairman,
    experienceOfViceChairman,
    visionAndMission,
    motto,
  }

  useEffect(() => {
    if (nomineeId) {
      getNominee(nomineeId)
    }
  }, [nomineeId])

  useEffect(() => {
    if (gotNominee) {
      setNameOfChairman(gotNominee.nameOfChairman)
      setNameOfViceChairman(gotNominee.nameOfViceChairman)
      setBirthdayOfChairman(gotNominee.birthdayOfChairman.substring(0, 10))
      setBirthdayOfViceChairman(
        gotNominee.birthdayOfViceChairman.substring(0, 10)
      )
      setAddressOfChairman(gotNominee.addressOfChairman)
      setAddressOfViceChairman(gotNominee.addressOfViceChairman)
      setExperienceOfChairman(gotNominee.experienceOfChairman)
      setExperienceOfViceChairman(gotNominee.experienceOfViceChairman)
      setVisionAndMission(gotNominee.visionAndMission)
      setMotto(gotNominee.motto)
    }
  }, [gotNominee])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nomineeId) {
      updateNominee(body, nomineeId)
    } else {
      createNominee(body)
    }

    setNameOfChairman('')
    setNameOfViceChairman('')
    setBirthdayOfChairman('')
    setBirthdayOfViceChairman('')
    setAddressOfChairman('')
    setAddressOfViceChairman('')
    setExperienceOfChairman('')
    setExperienceOfViceChairman('')
    setVisionAndMission('')
    setMotto('')
  }

  return (
    <div className='addNominee'>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <Alert alert='error' icon={errorIcon} message={errorMessage} />
        )}
        {successMessage && (
          <Alert alert='success' icon={successIcon} message={successMessage} />
        )}
        <h3> {nomineeId ? 'Update' : 'Add'} Nominee</h3>
        <div className='addNominee__form'>
          <div className='addNominee__form--left'>
            <h3>Ketua</h3>
            <div>
              <input
                type='text'
                placeholder='Nama Ketua'
                value={nameOfChairman}
                onChange={(e) => setNameOfChairman(e.target.value)}
              />
            </div>
            <div>
              <input
                type='date'
                placeholder='Tanggal Lahir'
                value={birthdayOfChairman}
                onChange={(e) => setBirthdayOfChairman(e.target.value)}
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='Alamat'
                value={addressOfChairman}
                onChange={(e) => setAddressOfChairman(e.target.value)}
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='Pengalaman'
                value={experienceOfChairman}
                onChange={(e) => setExperienceOfChairman(e.target.value)}
              />
            </div>
          </div>
          <div className='addNominee__form--right'>
            <h3>Wakil Ketua</h3>
            <div>
              <input
                type='text'
                placeholder='Nama Ketua'
                value={nameOfViceChairman}
                onChange={(e) => setNameOfViceChairman(e.target.value)}
              />
            </div>
            <div>
              <input
                type='date'
                placeholder='Tanggal Lahir'
                value={birthdayOfViceChairman}
                onChange={(e) => setBirthdayOfViceChairman(e.target.value)}
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='Alamat'
                value={addressOfViceChairman}
                onChange={(e) => setAddressOfViceChairman(e.target.value)}
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='Pengalaman'
                value={experienceOfViceChairman}
                onChange={(e) => setExperienceOfViceChairman(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='addNominee__unite'>
          <textarea
            placeholder='Visi dan Misi'
            value={visionAndMission}
            onChange={(e) => setVisionAndMission(e.target.value)}
          ></textarea>
          <input
            type='text'
            placeholder='Motto'
            value={motto}
            onChange={(e) => setMotto(e.target.value)}
          />
        </div>
        <div className='addNominee__buttons'>
          <button type='submit'>{nomineeId ? 'Update' : 'Add'}</button>
          <button
            onClick={() => {
              if (nomineeId) {
                setShowUpdateModal(false)
              } else {
                setShowModal(false)
              }
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  nomineeReducer: state.nominee,
})

export default connect(mapStateToProps, {
  createNominee,
  getNominee,
  updateNominee,
})(AddNominee)
