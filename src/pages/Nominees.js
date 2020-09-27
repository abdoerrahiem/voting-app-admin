import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getNominees } from '../redux/actions/nominee'
import NomineeTable from '../components/NomineeTable'
import AddNominee from '../components/AddNominee'
import './Nominees.css'

const Nominees = ({ getNominees, nomineeReducer }) => {
  const [showModal, setShowModal] = useState(false)
  const { nominees } = nomineeReducer

  useEffect(() => {
    getNominees()
  }, [nominees])

  return (
    <>
      {showModal && <AddNominee setShowModal={setShowModal} />}
      <div className='nominees'>
        <h3>
          <i className='fas fa-user-friends' /> Nominees
        </h3>
        <button className='btn-modal' onClick={() => setShowModal(true)}>
          <i className='fas fa-plus' /> Add Nominee
        </button>
        {nominees && (
          <div className='nominees__table'>
            <NomineeTable nominees={nominees} />
          </div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({ nomineeReducer: state.nominee })

export default connect(mapStateToProps, { getNominees })(Nominees)
