import React from 'react'
import styles from './style/MainLayout.module.scss'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

const { Header, Content, Footer } = Layout

export default function MainLayout() {
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
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        芮艾格德问卷 &copy;2024 - present. Created by 芮艾格德
      </Footer>
    </Layout>
  )
}
