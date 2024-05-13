import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer  from './features/userSlice'
import doctorReducer from "./features/doctorSlice"

const rootReducer = combineReducers({
    user:userReducer,
    doctor:doctorReducer
})

const store = configureStore({
    reducer:rootReducer
})

export default store;