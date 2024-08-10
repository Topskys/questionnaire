import React from 'react'
import styles from './style/index.module.scss'
import EditCanvas from './EditCanvas'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/slice/components'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'

export default function Edit() {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()

  // 取消选中
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <EditHeader></EditHeader>
      <main className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel></LeftPanel>
          </div>
          <div className={styles.center} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading}></EditCanvas>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel></RightPanel>
          </div>
        </div>
      </main>
    </div>
  )
}
