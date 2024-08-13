import React from 'react'
import styles from './style/ManageLayout.module.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, Divider, Space } from 'antd'
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import { createQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

export default function ManageLayout() {
  const nav = useNavigate()
  const { pathname } = useLocation()

  // 已被ahooks的useRequest取代
  // const [loading, setLoading] = useState(false)
  // 新建问卷按钮
  // async function handleCreateClick(path: string) {
  //   const data = await createQuestionService()
  //   const { id } = data || {}
  //   if (id) {
  //     nav(`${path}${id}`)
  //   }
  //   setLoading(true)
  // }

  const { loading, run: handleCreateClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: res => {
      const { id } = res || {}
      if (id) {
        nav(`/question/edit/${id}`)
      }
    }
  })

  const menus = [
    {
      name: '新建问卷',
      path: `/question/edit/`,
      icon: <PlusOutlined />,
      disabled: loading
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
        const { name, icon, path = '', disabled } = item
        const isFirstMenu = index === 0

        const isFirstMenuFn = () => {
          if (isFirstMenu) return 'primary'
          return pathname.startsWith(path) ? 'default' : 'text'
        }

        const handleClick = () => {
          if (isFirstMenu) {
            handleCreateClick()
          } else {
            nav(path)
          }
        }
        return (
          <div key={index}>
            <Button
              icon={icon}
              key={index}
              type={isFirstMenuFn()}
              size="large"
              onClick={handleClick}
              disabled={disabled}
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
