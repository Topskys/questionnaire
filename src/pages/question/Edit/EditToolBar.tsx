import React, { FC } from 'react'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { changeComponentHidden, removeSelectedComponent } from '../../../store/slice/components'

const EditToolBar: FC = () => {
  const dispatch = useDispatch()

  const tools = [
    {
      title: '删除',
      icon: <DeleteOutlined />,
      fn: () => {
        dispatch(removeSelectedComponent())
      },
    },
    {
      title: '隐藏',
      icon: <EyeInvisibleOutlined />,
      fn: () => {
        dispatch(changeComponentHidden())
      },
    },
  ]

  return (
    <Space>
      {tools.map((t, i) => {
        return (
          <Tooltip title={t.title} key={i + 1}>
            <Button shape="circle" icon={t.icon} onClick={t.fn}></Button>
          </Tooltip>
        )
      })}
    </Space>
  )
}

export default EditToolBar
