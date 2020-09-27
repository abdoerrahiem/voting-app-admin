import React from 'react'
import './Card.css'

const Card = ({ title, count, icon, backgroundColor }) => {
  return (
    <div className='card' style={{ backgroundColor }}>
      <p>{title}</p>
      <div>
        <h1>{count}</h1>
        <i className={`${icon}`} />
      </div>
    </div>
  )
}

export default Card
