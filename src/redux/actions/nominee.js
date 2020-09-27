import * as types from '../types'
import axios from 'axios'
import { config, removeAlert, api } from '../../utils'

// Get nominees
export const getNominees = () => async (dispatch) => {
  try {
    const res = await axios.get(`${api}/candidates`)
    dispatch({ type: types.GET_NOMINEES, payload: res.data })
  } catch (error) {
    dispatch({ type: types.GET_NOMINEES_ERROR, payload: error.response.data })
  }
}

// Create nominee
export const createNominee = (body) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/candidates`, body, config)
    dispatch({ type: types.CREATE_NOMINEE, payload: res.data })
    removeAlert(dispatch)
  } catch (error) {
    dispatch({ type: types.CREATE_NOMINEE_ERROR, payload: error.response.data })
    removeAlert(dispatch)
  }
}
// Update nominee
export const updateNominee = (body, nomineeId) => async (dispatch) => {
  try {
    const res = await axios.put(`${api}/candidates/${nomineeId}`, body, config)
    dispatch({ type: types.UPDATE_NOMINEE, payload: res.data })
    removeAlert(dispatch)
  } catch (error) {
    dispatch({ type: types.UPDATE_NOMINEE_ERROR, payload: error.response.data })
    removeAlert(dispatch)
  }
}

// Delete nominee
export const deleteNominee = (nomineeId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${api}/candidates/${nomineeId}`)
    dispatch({ type: types.DELETE_NOMINEE, payload: res.data })
    removeAlert(dispatch)
  } catch (error) {
    dispatch({ type: types.DELETE_NOMINEE_ERROR, payload: error.response.data })
    removeAlert(dispatch)
  }
}

// Get nominee
export const getNominee = (nomineeId) => async (dispatch) => {
  try {
    const res = await axios.get(`${api}/candidates/${nomineeId}`)
    dispatch({ type: types.GET_NOMINEE, payload: res.data })
  } catch (error) {
    dispatch({ type: types.DELETE_NOMINEE_ERROR, payload: error.response.data })
  }
}

// Add photo to chairman
export const addPhotoChairman = (nomineeId, chairmanUrl) => async (
  dispatch
) => {
  try {
    const res = await axios.put(
      `${api}/candidates/${nomineeId}/chairman/photo`,
      { chairmanUrl },
      config
    )
    dispatch({ type: types.UPLOAD_CHAIRMAN_PHOTO, payload: res.data })
    removeAlert(dispatch)
  } catch (error) {
    dispatch({
      type: types.UPLOAD_CHAIRMAN_PHOTO_ERROR,
      payload: error.response.data,
    })
    removeAlert(dispatch)
  }
}

// Add photo to vice chairman
export const addPhotoViceChairman = (nomineeId, viceChairmanUrl) => async (
  dispatch
) => {
  try {
    const res = await axios.put(
      `${api}/candidates/${nomineeId}/viceChairman/photo`,
      { viceChairmanUrl },
      config
    )
    dispatch({ type: types.UPLOAD_VICECHAIRMAN_PHOTO, payload: res.data })
    removeAlert(dispatch)
  } catch (error) {
    dispatch({
      type: types.UPLOAD_VICECHAIRMAN_PHOTO_ERROR,
      payload: error.response.data,
    })
    removeAlert(dispatch)
  }
}
