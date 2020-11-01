import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getVotes, createPdf } from '../redux/actions/vote'
import VoteTable from '../components/VoteTable'
import Spinner from '../components/Spinner'
import './Votes.css'

const Votes = ({ getVotes, createPdf, voteReducer }) => {
  const { voteLists, countVotes, success } = voteReducer

  useEffect(() => {
    getVotes()
    if (voteLists && countVotes) {
      createPdf()
    }
  }, [voteLists, countVotes, success])

  return (
    <div className='votes'>
      {!voteLists ? (
        <Spinner />
      ) : (
        <>
          <h3>
            <i className='fas fa-vote-yea' /> Votes
          </h3>
          <h5>Total Suara Masuk: {countVotes ? countVotes : 0}</h5>
          {success && (
            <button
              onClick={() =>
                (window.location.href = process.env.REACT_APP_PDF_URI)
              }
              className='animate__animated animate__backInDown'
            >
              <i className='fas fa-file-download' /> Download Hasil Voting
            </button>
          )}
          {voteLists.length > 0 ? (
            <VoteTable voteLists={voteLists} />
          ) : (
            <h4>Data voting tidak tersedia</h4>
          )}
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  voteReducer: state.vote,
})

export default connect(mapStateToProps, { getVotes, createPdf })(Votes)
