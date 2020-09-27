import * as types from '../types'

const initialState = {
  loading: true,
  error: null,
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_NOMINEES:
      return {
        ...state,
        nomineesCount: payload.count,
        nominees: payload.data,
        loading: false,
      }
    case types.CREATE_NOMINEE:
      return {
        ...state,
        loading: false,
        nominee: payload.data,
        successMessage: payload.message,
      }
    case types.GET_NOMINEE:
      return {
        ...state,
        loading: false,
        gotNominee: payload.data,
      }
    case types.UPDATE_NOMINEE:
    case types.DELETE_NOMINEE:
    case types.UPLOAD_CHAIRMAN_PHOTO:
    case types.UPLOAD_VICECHAIRMAN_PHOTO:
      return {
        ...state,
        loading: false,
        successMessage: payload.message,
      }
    case types.GET_NOMINEES_ERROR:
    case types.CREATE_NOMINEE_ERROR:
    case types.UPDATE_NOMINEE_ERROR:
    case types.DELETE_NOMINEE_ERROR:
    case types.GET_NOMINEES:
    case types.UPLOAD_CHAIRMAN_PHOTO_ERROR:
    case types.UPLOAD_VICECHAIRMAN_PHOTO_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: payload.message,
      }
    default:
      return state
  }
}
