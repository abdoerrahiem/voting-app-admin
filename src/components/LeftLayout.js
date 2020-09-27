import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

const LeftLayout = ({ user: { adminData } }) => {
  const currentPath = useLocation().pathname

  return (
    <div className='voting__left'>
      <div>
        <Link to='/'>E-Voting</Link>
      </div>
      {adminData && (
        <div className='adminData'>
          <div>
            <img src={adminData.photo} alt='profile' />
          </div>
          <div>
            <p>{adminData.name}</p>
            <p>
              <i className='fas fa-circle' /> Online
            </p>
          </div>
        </div>
      )}
      <div className='links'>
        <Link to='/' className={currentPath === '/' ? 'current' : ''}>
          <i className='fas fa-tachometer-alt' /> Dashboard
        </Link>
        <Link
          to='/voters'
          className={currentPath === '/voters' ? 'current' : ''}
        >
          <i className='fas fa-users' /> Voters
        </Link>
        <Link
          to='/nominees'
          className={currentPath === '/nominees' ? 'current' : ''}
        >
          <i className='fas fa-user-friends' /> Nominees
        </Link>
        <Link to='/votes' className={currentPath === '/votes' ? 'current' : ''}>
          <i className='fas fa-vote-yea' /> Votes
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(LeftLayout)
