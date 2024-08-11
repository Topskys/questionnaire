import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './style/ComponentList.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

// 问卷分析页 - 组件列表
const ComponentList: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { componentList } = useGetComponentInfo()

  return (
    <div className={styles.container}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          // 获取组件配置
          const { fe_id, props, type } = c
          const componentConf = getComponentConfByType(type)
          if (componentConf == null) return null
          const { Component } = componentConf
          // 拼接className
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: selectedComponentId === fe_id
          })
          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={() => {
                setSelectedComponentId(fe_id)
                setSelectedComponentType(type)
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
