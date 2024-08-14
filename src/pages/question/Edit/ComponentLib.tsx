import React, { FC, useCallback } from 'react'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import styles from './style/ComponentLib.module.scss'
import { addComponent } from '../../../store/slice/components'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'

const { Title } = Typography

function getComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c
  const dispatch = useDispatch()

  // function handleClick() {
  //   // 将左侧组件添加到画布
  //   dispatch(
  //     addComponent({
  //       fe_id: nanoid(),
  //       title,
  //       type,
  //       props: defaultProps // 根据组件类型设置默认属性
  //     })
  //   )
  // }

  /**
   * useCallback专用于缓存函数
   * 优化：使用useCallback缓存新增组件实例函数
   */
  const handleClick = useCallback(() => {
    // 将左侧组件添加到画布
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps // 根据组件类型设置默认属性
      })
    )
  }, [])

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <div style={{ minHeight: 'calc(100vh - 400px)', overflow: 'auto' }}>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{
                fontSize: '16px',
                marginTop: index > 0 ? '20px' : '0px'
              }}
            >
              {groupName}
            </Title>
            <div>{components.map(c => getComponent(c))}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ComponentLib
