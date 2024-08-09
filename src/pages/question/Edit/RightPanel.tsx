import React, { FC, useState } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentProp from './ComponentProp'

const LeftPanel: FC = () => {
  const items = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>页面设置</div>,
    },
  ]

  const [activeKey, setActiveKey] = useState(items[0].key)

  function onChange(key: string) {
    setActiveKey(key)
  }

  return <Tabs defaultActiveKey={activeKey} items={items} onChange={onChange} />
}

export default LeftPanel
