import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import { getUsers, getVotedUsers, getUnVotedUsers } from '../redux/actions/user'
import { getNominees } from '../redux/actions/nominee'
import Card from '../components/Card'
import './Dashboard.css'

const Dashboard = ({
  getUsers,
  getVotedUsers,
  getUnVotedUsers,
  getNominees,
  userReducer,
  nomineeReducer,
}) => {
  const { usersCount, votedUsersCount, unVotedUsersCount } = userReducer
  const { nomineesCount } = nomineeReducer

  useEffect(() => {
    getUsers()
    getVotedUsers()
    getUnVotedUsers()
    getNominees()
  }, [])

  return (
    <div className='dashboard'>
      <h3>
        <i className='fas fa-tachometer-alt' /> Dashboard
      </h3>
      {typeof usersCount &&
      typeof votedUsersCount &&
      typeof unVotedUsersCount &&
      typeof nomineesCount ? (
        <div>
          <Card
            title='Users'
            count={usersCount}
            icon='fas fa-users'
            backgroundColor='green'
          />
          <Card
            title='Nominees'
            count={nomineesCount}
            icon='fas fa-user-friends'
            backgroundColor='blue'
          />
          <Card
            title='Voted Users'
            count={votedUsersCount}
            icon='fas fa-users'
            backgroundColor='yellow'
          />
          <Card
            title='Unvoted Users'
            count={unVotedUsersCount}
            icon='fas fa-users'
            backgroundColor='red'
          />
        </div>
      ) : (
        <div>
          <ClipLoader color='#26a5ff' />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  userReducer: state.user,
  nomineeReducer: state.nominee,
})

export default connect(mapStateToProps, {
  getUsers,
  getVotedUsers,
  getUnVotedUsers,
  getNominees,
})(Dashboard)
