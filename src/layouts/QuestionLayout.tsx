import React from 'react'
import styles from './style/QuestionLayout.module.scss'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import Loading from '../components/Loading'

export default function QuestionLayout() {
  // 检查用户登录，加载用户数据
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return <div className={styles.layout}>{waitingUserData ? <Loading /> : <Outlet />}</div>
}
