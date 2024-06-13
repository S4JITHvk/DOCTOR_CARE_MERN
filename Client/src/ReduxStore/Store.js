import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer  from './features/userSlice'
import doctorReducer from "./features/doctorSlice"
import appointmentReducer from "./features/appointmentSlice"
import converstionReducer from "./features/converstionSlice"
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const rootReducer = combineReducers({
    user:userReducer,
    doctor:doctorReducer,
    appointments:appointmentReducer,
    converstions:converstionReducer
})
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  export const store= configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
})


export const persistor = persistStore(store)