import React from 'react'
import styles from './style/MainLayout.module.scss'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import Loading from '../components/Loading'

const { Header, Content, Footer } = Layout

export default function MainLayout() {
  // 检查用户登录，加载用户数据
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>{waitingUserData ? <Loading /> : <Outlet />}</Content>
      <Footer className={styles.footer}>
        芮艾格德问卷 &copy;2024 - present. Created by 芮艾格德
      </Footer>
    </Layout>
  )
}
