import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import user from './reducers/user'
import nominee from './reducers/nominee'
import vote from './reducers/vote'

const rooterReducer = combineReducers({ user, nominee, vote })
const initialState = {}
const middleware = [thunk]

const store = createStore(
  rooterReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
