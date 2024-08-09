import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import styles from './EditCanvas.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changeSelectedId, ComponentInfoType } from '../../../store/slice/components'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

type PropsType = {
  loading?: boolean
}

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props} />
}

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
          alignItems: 'center',
          height: '100vh'
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

  return (
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
            <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
              <div className={styles.component}>{getComponent(c)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default EditCanvas
