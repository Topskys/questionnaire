import React, { FC, useState } from 'react'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'
import { Tabs } from 'antd'

const LeftPanel: FC = () => {
  const items = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <div>图层</div>,
    },
  ]

  const [activeKey, setActiveKey] = useState(items[0].key)

  function onChange(key: string) {
    setActiveKey(key)
  }

  return <Tabs defaultActiveKey={activeKey} items={items} onChange={onChange} />
}

export default LeftPanel
