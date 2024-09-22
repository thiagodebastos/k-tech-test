import { combineReducers } from "@reduxjs/toolkit"
import { usersApi } from "@/features/users/usersApi"

const rootReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
})

export default rootReducer
