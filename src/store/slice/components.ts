import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { produce } from 'immer'

export type ComponentInfoType = {
  fe_id: string // 组件id，防止跟MongoDB生成_id一致，故加前缀fe
  type: string // 组件类型
  title: string // 组件标题
  props: ComponentPropsType // 组件属性
}

export type ComponentsStateType = {
  selectedId?: string // 当前选中的组件id
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  componentList: [], // 组件列表
  selectedId: '', // 当前选中的组件id
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // 修改selectedId
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    // 往画布添加新组件
    addComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload
      const { selectedId, componentList } = draft
      const index = componentList.findIndex(c => c.fe_id === selectedId)
      // 未选中组件时，添加到组件列表末尾
      if (index < 0) {
        draft.componentList.push(newComponent)
      } else {
        // 如果当前选中组件存在，则插入到当前选中组件之后
        draft.componentList.splice(index + 1, 0, newComponent)
      }
      // 选中当前插入的组件
      draft.selectedId = newComponent.fe_id
    }),
    // 修改组件属性
    changeComponentProps: produce((draft: ComponentsStateType, action: PayloadAction<{ fe_id: string, newProps: ComponentPropsType }>) => {
      const { fe_id, newProps } = action.payload
      const currentComponent = draft.componentList.find(c => c.fe_id === fe_id)
      if (currentComponent) { // 判 null
        currentComponent.props = {
          ...currentComponent.props,
          ...newProps,
        }
      }
    })
  },
})

export const { resetComponents, changeSelectedId, addComponent,changeComponentProps } = componentsSlice.actions

export default componentsSlice.reducer
