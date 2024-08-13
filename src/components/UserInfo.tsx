import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/slice/user'

/**
 * 用户信息
 */
export default function UserInfo() {
  const nav = useNavigate()
  const dispatch = useDispatch()

  // const { data } = useRequest(getUserInfoService)
  const { username, nickname } = useGetUserInfo() || {}

  // 退出登录
  function logout() {
    dispatch(logoutReducer()) // 清空redux中的用户信息
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
