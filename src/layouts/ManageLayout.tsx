import React from 'react'
import styles from './style/ManageLayout.module.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, Divider, Space } from 'antd'
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'

export default function ManageLayout() {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const menus = [
    {
      name: '新建问卷',
      path: '/manage/add',
      icon: <PlusOutlined />
    },
    {
      name: '我的问卷',
      path: '/manage/list',
      icon: <BarsOutlined />
    },
    {
      name: '星标问卷',
      path: '/manage/star',
      icon: <StarOutlined />
    },
    {
      name: '回收站',
      path: '/manage/trash',
      icon: <DeleteOutlined />
    }
  ]

  const MenusElem = (
    <Space direction="vertical">
      {menus.map((item, index) => {
        const { name, icon, path = '' } = item
        const isFirstMenu = (idx: number) => {
          if (idx === 0) return 'primary'
          return pathname.startsWith(path) ? 'default' : 'text'
        }
        return (
          <div key={index}>
            <Button
              icon={icon}
              key={index}
              type={isFirstMenu(index)}
              size="large"
              onClick={() => nav(path)}
            >
              {name}
            </Button>
            {index === 0 && <Divider style={{ borderTop: 'transparent' }} />}
          </div>
        )
      })}
    </Space>
  )

  return (
    <div className={styles.container}>
      <div className={styles.left}>{MenusElem}</div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}
