import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const nav = useNavigate()

  const handleStart = () => {
    nav({
        pathname:'/login',
        search:'?redirect=/home' // 重定向到home页面
    })
  }

  return (
    <div>
      <Button onClick={handleStart}>开始使用</Button>
    </div>
  )
}
