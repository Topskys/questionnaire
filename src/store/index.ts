import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import componentsReducer, { ComponentsStateType } from './slice/components'
import pageInfoReducer, { PageInfoType } from './slice/pageInfo'

const store = configureStore({
  reducer: {
    components: componentsReducer,
    pageInfo: pageInfoReducer // key 必须与createSlice的name一致
  }
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
  // 编辑页组件列表
  components: ComponentsStateType
  // components: StateWithHistory<ComponentsStateType> // 增加了 undo
  // 页面信息 （页面设置）
  pageInfo: PageInfoType
}
