import React, { FC, useState } from 'react'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'
import { Tabs } from 'antd'
import Layers from './Layers'

const LeftPanel: FC = () => {
  const items = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined style={{ marginRight: '5px' }} />
          组件库
        </span>
      ),
      children: <ComponentLib />
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined style={{ marginRight: '5px' }} />
          图层
        </span>
      ),
      children: <Layers />
    }
  ]

  const [activeKey, setActiveKey] = useState(items[0].key)

  function onChange(key: string) {
    setActiveKey(key)
  }

  return <Tabs defaultActiveKey={activeKey} items={items} onChange={onChange} />
}

export default LeftPanel
