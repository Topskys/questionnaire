import { useTitle } from 'ahooks'
import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME } from '../router'

// 404页面
export default function NotFound() {
  useTitle('芮艾格德问卷 - NotFound')
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
          返回首页
        </Button>
      }
    ></Result>
  )
}
