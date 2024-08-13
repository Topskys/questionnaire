import { Spin } from 'antd'
import React from 'react'

export default function Loading() {
  return (
    <div style={{ textAlign: 'center', marginTop: 60 }}>
      <Spin />
    </div>
  )
}
