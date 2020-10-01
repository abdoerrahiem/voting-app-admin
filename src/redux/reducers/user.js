import * as types from '../types'

const initialState = {
  token: localStorage.getItem('x-auth-token') || null,
  adminData: null,
  isAdmin: false,
  loading: true,
  error: null,
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.LOGIN:
      localStorage.setItem('x-auth-token', payload.token)
      return {
        ...state,
        isAdmin: true,
        loading: false,
      }
    case types.USER_LOGOUT:
      localStorage.removeItem('x-auth-token')
      return {
        token: null,
        adminData: null,
        isAdmin: false,
        loading: false,
        error: null,
      }
    case types.GET_CURRENT_USER:
      return {
        ...state,
        isAdmin: true,
        adminData: payload.data,
        loading: false,
      }
    case types.GET_USERS:
      return {
        ...state,
        loading: false,
        usersCount: payload.count,
        usersData: payload.data,
      }
    case types.GET_VOTED_USERS:
      return {
        ...state,
        loading: false,
        votedUsersCount: payload.count,
        votedUsersData: payload.data,
      }
    case types.GET_UNVOTED_USERS:
      return {
        ...state,
        loading: false,
        unVotedUsersCount: payload.count,
        unVotedUsersData: payload.data,
      }
    case types.CREATE_USER:
      return {
        ...state,
        loading: false,
        userData: payload.data,
        successMessage: payload.message,
      }
    case types.REMOVE_USER:
    case types.UPDATE_USER:
    case types.UPLOAD_USER_PHOTO:
      return {
        ...state,
        loading: false,
        successMessage: payload.message,
      }
    case types.GET_USER:
      return {
        ...state,
        loading: false,
        userData: payload.data,
      }
    case types.GET_USERS_BY_NAME:
      return {
        ...state,
        loading: false,
        usersData: payload.data,
      }
    case types.LOGIN_ERROR:
      localStorage.removeItem('x-auth-token')
      return {
        isAdmin: false,
        loading: false,
        error: payload,
      }
    case types.GET_CURRENT_USER_ERROR:
    case types.GET_USERS_ERROR:
    case types.GET_VOTED_USERS_ERROR:
    case types.GET_UNVOTED_USERS_ERROR:
      return {
        isAdmin: false,
        loading: false,
        error: payload,
      }
    case types.REMOVE_ALERT:
      return {
        ...state,
        error: null,
        errorMessage: null,
        successMessage: null,
      }
    case types.CREATE_USER_ERROR:
    case types.REMOVE_USER_ERROR:
    case types.GET_USER_ERROR:
    case types.UPDATE_USER_ERROR:
    case types.GET_USERS_BY_NAME:
    case types.UPLOAD_USER_PHOTO_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: payload.message,
      }
    default:
      return state
  }
}
