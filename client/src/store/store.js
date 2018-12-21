import { initialState, reducer } from './reducer'

import { createStore } from 'redux'

export default createStore(reducer,initialState)