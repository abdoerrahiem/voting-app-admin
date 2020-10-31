import * as types from '../types'
import axios from 'axios'
import { removeAlert, api } from '../../utils'

export const addVote = (candidateId) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/votes/${candidateId}`)
    dispatch({ type: types.ADD_VOTE, payload: res.data })
  } catch (error) {
    dispatch({ type: types.ADD_VOTE_ERROR, payload: error.response.data })
  }
}

export const getVotes = () => async (dispatch) => {
  try {
    const res = await axios.get(`${api}/votes`)
    dispatch({ type: types.GET_VOTES, payload: res.data })
  } catch (error) {
    dispatch({ type: types.GET_VOTES_ERROR, payload: error.response })
    console.log(error.response)
  }
}

export const deleteVote = (voteId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${api}/votes/${voteId}`)
    dispatch({ type: types.DELETE_VOTE, payload: res.data })
    removeAlert(dispatch)
  } catch (error) {
    dispatch({ type: types.DELETE_VOTE_ERROR, payload: error.response.data })
    removeAlert(dispatch)
  }
}

export const deleteVotes = () => async (dispatch) => {
  try {
    const res = await axios.delete(`${api}/votes`)
    dispatch({ type: types.DELETE_VOTES, payload: res.data })
    removeAlert(dispatch)
  } catch (error) {
    dispatch({ type: types.DELETE_VOTES_ERROR, payload: error.response.data })
    removeAlert(dispatch)
  }
}
