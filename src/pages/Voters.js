import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../redux/actions/user'
import Table from '../components/Table'
import AddVoter from '../components/AddVoter'
import './Voters.css'

const Voters = ({ getUsers, userReducer }) => {
  const { usersData } = userReducer
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getUsers()
  }, [usersData])

  return (
    <>
      {showModal && <AddVoter setShowModal={setShowModal} />}
      <div className='voters'>
        <h3>
          <i className='fas fa-users' /> Voters
        </h3>
        <button className='btn-modal' onClick={() => setShowModal(true)}>
          <i className='fas fa-plus' /> Add Voters
        </button>
        {usersData && (
          <div className='voters__table'>
            <Table
              usersData={usersData}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  userReducer: state.user,
})

export default connect(mapStateToProps, { getUsers })(Voters)
