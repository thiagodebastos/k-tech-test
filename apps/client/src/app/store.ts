import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { setupListeners } from "@reduxjs/toolkit/query"
import { listenerMiddleware } from "./listenerMiddleware"
import { usersApi } from "@/features/users/usersApi"


export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(usersApi.middleware),
})

setupListeners(store.dispatch)

export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
