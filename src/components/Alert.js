import React, { useState } from 'react'
import './Alert.css'

const Alert = ({ alert, icon, message }) => {
  const [show, setShow] = useState(true)

  const handleClick = () => setShow(false)

  setTimeout(() => {
    setShow(false)
  }, [3000])

  return (
    show && (
      <div className={`alert ${alert}`}>
        <p>
          {icon} {message}
        </p>
        <i className='fas fa-times' onClick={handleClick} />
      </div>
    )
  )
}

export default Alert
