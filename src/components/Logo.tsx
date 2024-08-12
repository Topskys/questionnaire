import { FormOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'

const { Title } = Typography

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
        <Space>
          <Title level={1}>
            <FormOutlined />
          </Title>
          <Title>芮艾格德问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
