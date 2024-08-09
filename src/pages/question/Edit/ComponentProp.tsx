import React, { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../store/slice/components'
import { useDispatch } from 'react-redux'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  // 选中的组件
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />
  const { type, props } = selectedComponent
  //   根据组件类型获取组件配置
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />
  //   获取组件属性
  const { PropComponent } = componentConf

  // 在此统一监听左右属性组件表单数据变化，并同步到redux中
  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  //   展示属性组件
  return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp
