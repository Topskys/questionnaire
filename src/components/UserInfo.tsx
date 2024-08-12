import React from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'

export default function UserInfo() {
  return <Link to={LOGIN_PATHNAME}>登录</Link>
}
