import React, { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import { connect } from 'react-redux'
import { deleteVote, deleteVotes } from '../redux/actions/vote'
import { successIcon } from '../utils'
import Alert from './Alert'
import './VoteTable.css'
moment.locale()

const VoteTable = ({ voteLists, deleteVote, deleteVotes, voteReducer }) => {
  const [showModal, setShowModal] = useState(false)
  const { successMessage } = voteReducer

  return (
    <div className='voteTable'>
      <button className='delete-button' onClick={() => setShowModal(true)}>
        <i className='fas fa-trash-alt' /> Hapus Semua Vote
      </button>
      {successMessage && (
        <Alert alert='success' icon={successIcon} message={successMessage} />
      )}
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name (Username)</th>
            <th>Memilih</th>
            <th>Waktu</th>
            <th>Hapus</th>
          </tr>
        </thead>
        <tbody>
          {voteLists.map((vote, index) => (
            <tr key={vote._id}>
              <td>{index + 1}</td>
              <td>
                {vote.user.name} {`(${vote.user.username})`}
              </td>
              <td>
                {vote.candidate.nameOfChairman} &{' '}
                {vote.candidate.nameOfViceChairman}
              </td>
              <td>{moment(vote.createdAt).calendar()}</td>
              <td onClick={() => deleteVote(vote._id)}>
                <i className='fas fa-trash' title='Hapus' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className='voteTable__confirm-modal'>
          <div className='voteTable__confirm-modal--content'>
            <p>Apakah anda yakin ?</p>
            <div>
              <button
                onClick={() => {
                  setShowModal(false)
                  deleteVotes()
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  voteReducer: state.vote,
})

export default connect(mapStateToProps, { deleteVote, deleteVotes })(VoteTable)
