import React from 'react'
import axios from 'axios'
import * as types from '../redux/types'

export const config = { headers: { 'Content-Type': 'application/json' } }

export const successIcon = <i className='fas fa-check-circle' />

export const errorIcon = <i className='fas fa-exclamation-triangle' />

export const removeAlert = (dispatch) =>
  setTimeout(() => {
    dispatch({ type: types.REMOVE_ALERT })
  }, 3000)

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export const imageTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/JPG',
  'image/JPEG',
]

export const api = 'https://votingapp-api.herokuapp.com/api'
