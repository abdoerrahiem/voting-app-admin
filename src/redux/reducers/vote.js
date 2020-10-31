import * as types from '../types'

export default (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case types.ADD_VOTE:
      return {
        ...state,
        successMessage: payload.message,
        addedVote: payload.data,
      }
    case types.GET_VOTES:
      return {
        ...state,
        countVotes: payload.count,
        voteLists: payload.data,
      }
    case types.DELETE_VOTE:
    case types.DELETE_VOTES:
      return {
        ...state,
        successMessage: payload.message,
      }
    case types.ADD_VOTE_ERROR:
    case types.DELETE_VOTE_ERROR:
    case types.DELETE_VOTES_ERROR:
      return {
        ...state,
        errorMessage: payload.message,
      }
    case types.GET_VOTES_ERROR:
      return {
        ...state,
        errorMessage: payload,
      }
    default:
      return state
  }
}
