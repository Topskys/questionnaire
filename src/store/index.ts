import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import componentsReducer, { ComponentsStateType } from './slice/components'

const store = configureStore({
  reducer: {
    components: componentsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store

export type StateType = {
  // user: UserStateType
  components: ComponentsStateType
  // components: StateWithHistory<ComponentsStateType> // 增加了 undo
  // pageInfo: PageInfoType
}
