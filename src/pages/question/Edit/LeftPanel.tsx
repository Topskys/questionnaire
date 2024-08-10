import React, { FC } from 'react'
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

  return <Tabs defaultActiveKey={items[0].key} items={items} />
}

export default LeftPanel
