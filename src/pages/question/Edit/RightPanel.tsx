import React, { FC, useEffect, useState } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

// TS 枚举
enum TAB_KEYS {
  PROP = 'prop',
  PAGE_SETTING = 'setting'
}

const RightPanel: FC = () => {
  const items = [
    {
      key: TAB_KEYS.PROP,
      label: (
        <span>
          <FileTextOutlined style={{ marginRight: '5px' }} />
          属性
        </span>
      ),
      children: <ComponentProp />
    },
    {
      key: TAB_KEYS.PAGE_SETTING,
      label: (
        <span>
          <SettingOutlined style={{ marginRight: '5px' }} />
          页面设置
        </span>
      ),
      children: <PageSetting />
    }
  ]

  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP)
  const { selectedId } = useGetComponentInfo()

  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP)
    else setActiveKey(TAB_KEYS.PAGE_SETTING)
  }, [selectedId])

  return <Tabs defaultActiveKey={activeKey} items={items} />
}

export default RightPanel
