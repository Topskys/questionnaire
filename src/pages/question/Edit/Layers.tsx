import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './Layers.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { Button, Input, message, Space } from 'antd'
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  toggleComponentLocked
} from '../../../store/slice/components'
import classNames from 'classnames'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'

// 编辑页-图层
const Layers: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, componentList = [] } = useGetComponentInfo()
  //   记录当前修改的title
  const [changingTitleId, setChangingTitleId] = useState('')

  // 点击组件
  function handleTitleClick(fe_id: string) {
    const currComponent = componentList.find(c => c.fe_id === fe_id)
    if (currComponent && currComponent.isHidden) {
      message.info('不能选中已隐藏的组件')
      return
    }
    if (fe_id !== selectedId) {
      // 未被选中
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('') // 取消选中
      return
    }
    // 执行选中
    setChangingTitleId(fe_id)
  }

  // 修改组件标题
  function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim()
    if (!newTitle || !selectedId) return
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  // 切换显示/隐藏
  const changeHidden = (fe_id: string, isHidden: boolean) => {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  // 切换锁定/解锁
  const changeLocked = (fe_id: string) => {
    dispatch(toggleComponentLocked({ fe_id }))
  }

  return (
    <>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c
        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const lockedClassName = styles.locked
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: selectedId === fe_id,
          [lockedClassName]: isLocked
        })
        return (
          <div key={fe_id} className={styles['layers-wrapper']}>
            <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
              {fe_id === changingTitleId ? (
                <Input
                  value={title}
                  onChange={handleChangeTitle}
                  onPressEnter={() => setChangingTitleId('')}
                  onBlur={() => setChangingTitleId('')}
                />
              ) : (
                title
              )}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  type={isHidden ? 'primary' : 'text'}
                  size="small"
                  shape="circle"
                  icon={<EyeInvisibleOutlined />}
                  className={isHidden ? '' : styles.btn}
                  onClick={() => changeHidden(fe_id, !isHidden)}
                />
                <Button
                  type={isLocked ? 'primary' : 'text'}
                  size="small"
                  shape="circle"
                  icon={<LockOutlined />}
                  className={isLocked ? '' : styles.btn}
                  onClick={() => changeLocked(fe_id)}
                />
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
