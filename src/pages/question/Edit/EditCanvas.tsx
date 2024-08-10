import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import styles from './style/EditCanvas.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changeSelectedId, ComponentInfoType, moveComponent } from '../../../store/slice/components'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

type PropsType = {
  loading?: boolean
}

// 获取左侧组件库的组件
function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props} />
}

// 渲染组件画布
const EditCanvas: FC<PropsType> = ({ loading }) => {
  const dispatch = useDispatch()
  useBindCanvasKeyPress() // 注册快捷键
  const { componentList, selectedId } = useGetComponentInfo()

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '50px'
        }}
      >
        <Spin />
      </div>
    )
  }

  // 点击组件，改变selectedId
  const handleClick = (e: MouseEvent, id: string): void => {
    e.stopPropagation() // 阻止事件冒泡（事件往父级传送），会影响上级的clearSelectedId事件
    dispatch(changeSelectedId(id))
  }

  const componentListWithId = componentList.map(c => ({ ...c, id: c.fe_id }))

  // 同步拖拽排序结果到redux store
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(
      moveComponent({
        oldIndex,
        newIndex
      })
    )
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id } = c
            const wrapperDefaultClassName = styles['component-wrapper']
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: selectedId === fe_id,
              [lockedClassName]: c.isLocked
            })
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{getComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
