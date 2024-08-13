import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/user-token'

/**
 * 用户信息
 */
export default function UserInfo() {
  const { data } = useRequest(getUserInfoService)
  const { username, nickname } = data || {}

  const nav = useNavigate()

  // 退出登录
  function logout() {
    removeToken() // 清除token
    nav(LOGIN_PATHNAME) // 跳转到登录页
    message.success('退出成功')
  }

  const UserInfoElem = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined style={{ marginRight: '5px' }} />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const LoginElem = <Link to={LOGIN_PATHNAME}>登录</Link>

  return username ? UserInfoElem : LoginElem
}
