import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions/user'
import './Navbar.css'

const Navbar = ({ showLayout, setShowLayout, user: { adminData }, logout }) => {
  return (
    <div className='navbar'>
      <div onClick={() => setShowLayout(!showLayout)}>
        <i className='fas fa-bars' />
      </div>
      <div>
        {adminData && <p>Hai, {adminData.name}</p>}
        <Link to='/login' onClick={logout}>
          <i className='fas fa-sign-out-alt' /> Logout
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, { logout })(Navbar)
