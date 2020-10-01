import * as types from '../types'
import axios from 'axios'
import { config, removeAlert, api, setAuthToken } from '../../utils'

// Login
export const login = (username, password) => async (dispatch) => {
  const body = { username, password }
  try {
    const res = await axios.post(`${api}/users/loginAdmin`, body, config)
    dispatch({ type: types.LOGIN, payload: res.data })
    dispatch(getCurrentUser())
  } catch (error) {
    dispatch({ type: types.LOGIN_ERROR, payload: error.response.data })
    removeAlert(dispatch)
  }
}

// Current user
export const getCurrentUser = () => async (dispatch) => {
  if (localStorage.getItem('x-auth-token')) {
    setAuthToken(localStorage.getItem('x-auth-token'))
  }

  try {
    const res = await axios.get(`${api}/users/me`)
    dispatch({ type: types.GET_CURRENT_USER, payload: res.data })
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_ERROR })
  }
}

// Get users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${api}/users`)
    dispatch({ type: types.GET_USERS, payload: res.data })
  } catch (error) {
    dispatch({ type: types.GET_USERS_ERROR })
  }
}

// Get voted users
export const getVotedUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${api}/users?isVoted=true`)
    dispatch({ type: types.GET_VOTED_USERS, payload: res.data })
  } catch (error) {
    dispatch({ type: types.GET_VOTED_USERS_ERROR })
  }
}

// Get unvoted users
export const getUnVotedUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${api}/users?isVoted=false`)
    dispatch({ type: types.GET_UNVOTED_USERS, payload: res.data })
  } catch (error) {
    dispatch({ type: types.GET_UNVOTED_USERS_ERROR })
  }
}

// Register user
export const createUser = (body) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/users/register`, body, config)
    dispatch({ type: types.CREATE_USER, payload: res.data })
    removeAlert(dispatch)
  } catch (error) {
    dispatch({ type: types.CREATE_USER_ERROR, payload: error.response.data })
    removeAlert(dispatch)
  }
}

// Remove user
export const removeUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${api}/users/${userId}`)
    dispatch({ type: types.REMOVE_USER, payload: res.data })
    removeAlert(dispatch)
  } catch (error) {
    dispatch({ type: types.REMOVE_USER_ERROR, payload: error.response.data })
    removeAlert(dispatch)
  }
}

// Get user
export const getUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${api}/users/${userId}`)
    dispatch({ type: types.GET_USER, payload: res.data })
  } catch (error) {
    dispatch({ type: types.GET_USER_ERROR, payload: error.response.data })
  }
}

// Update user
export const updateUser = (userId, body) => async (dispatch) => {
  try {
    const res = await axios.put(`${api}/users/${userId}`, body, config)
    dispatch({ type: types.UPDATE_USER, payload: res.data })
    removeAlert(dispatch)
  } catch (error) {
    dispatch({ type: types.UPDATE_USER_ERROR, payload: error.response.data })
    removeAlert(dispatch)
  }
}

// Get users by name
export const getUsersByName = (name) => async (dispatch) => {
  try {
    const res = await axios.put(`${api}/users/usersByName`, name, config)
    dispatch({ type: types.GET_USERS_BY_NAME, payload: res.data })
    removeAlert(dispatch)
  } catch (error) {
    dispatch({
      type: types.GET_USERS_BY_NAME_ERROR,
      payload: error.response.data,
    })
    removeAlert(dispatch)
  }
}

// Update user's photo
export const updateUserPhoto = (userId, url) => async (dispatch) => {
  try {
    const res = await axios.put(`${api}/users/${userId}/photo`, { url }, config)
    dispatch({ type: types.UPLOAD_USER_PHOTO, payload: res.data })
    removeAlert(dispatch)
  } catch (error) {
    dispatch({
      type: types.UPLOAD_USER_PHOTO_ERROR,
      payload: error.response.data,
    })
    removeAlert(dispatch)
  }
}

// Logout user
export const logout = () => (dispatch) => {
  dispatch({ type: types.USER_LOGOUT })
}
