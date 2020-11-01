import React from 'react'
import { ClipLoader } from 'react-spinners'
import { css } from 'styled-components'

const Spinner = () => {
  return (
    <>
      <ClipLoader css={Loader} size={50} color={'#123abc'} />
    </>
  )
}

const Loader = css`
  display: block;
  margin: 0 auto;
`

export default Spinner
