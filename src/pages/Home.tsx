import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME } from '../router'
import { Typography } from 'antd'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography

export default function Home() {
  const nav = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 660 份，发布问卷 621 份，收到答卷 580 份</Paragraph>
        <div>
          <Button type="primary" size="large" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}
