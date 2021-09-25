import {combineReducers, configureStore, Action} from '@reduxjs/toolkit'
import {ThunkAction } from 'redux-thunk'

import UserReducer from './reducers/UserReducer'
import WorkPointsReducer from './reducers/WorkPointsReducer'

const reducer = combineReducers({
    user:UserReducer,
    wokrPoint: WorkPointsReducer
})

const store = configureStore({
    reducer
})


export type rootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, rootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store