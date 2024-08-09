import React, { FC } from 'react'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'
import { Typography } from 'antd'
import styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { addComponent } from '../../../store/slice/components'

const { Title } = Typography

function getComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c
  const dispatch = useDispatch()

  function handleClick() {
    // 将左侧组件添加到画布
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps, // 根据组件类型设置默认属性
      })
    )
  }

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
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{
                fontSize: '16px',
                marginTop: index > 0 ? '20px' : '0px',
              }}
            >
              {groupName}
            </Title>
            <div>{components.map(c => getComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
