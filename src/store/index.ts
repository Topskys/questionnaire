import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import userReducer, { UserStateType } from './slice/user'
import componentsReducer, { ComponentsStateType } from './slice/components'
import pageInfoReducer, { PageInfoType } from './slice/pageInfo'

export type StateType = {
  user: UserStateType
  // 编辑页组件列表 没有redux-undo
  // components: ComponentsStateType
  components: StateWithHistory<ComponentsStateType> // 增加了 undo
  // 页面信息 （页面设置）
  pageInfo: PageInfoType
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

const store = configureStore({
  reducer: {
    user: userReducer,
    // no redux-undo
    // components: componentsReducer,
    // add redux-undo
    components: undoable(componentsReducer, {
      limit: 20, // 限制历史记录数量 20 步
      filter: excludeAction([
        // 排除某些action
        'components/resetComponent',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent'
      ])
    }),
    pageInfo: pageInfoReducer // key 必须与createSlice的name一致
  }
})

export default store
