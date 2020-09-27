import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getVotes } from '../redux/actions/vote'
import VoteTable from '../components/VoteTable'
import './Votes.css'

const Votes = ({ getVotes, voteReducer }) => {
  const { voteLists, countVotes } = voteReducer

  useEffect(() => {
    getVotes()
  }, [getVotes, voteLists, countVotes])

  return (
    <div className='votes'>
      <h3>
        <i className='fas fa-vote-yea' /> Votes
      </h3>
      <h5>Total Suara Masuk: {countVotes ? countVotes : 0}</h5>
      {voteLists && voteLists.length > 0 ? (
        <VoteTable voteLists={voteLists} />
      ) : (
        <h4>Data voting tidak tersedia</h4>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  voteReducer: state.vote,
})

export default connect(mapStateToProps, { getVotes })(Votes)
