import React, { FC } from 'react'
import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { changeComponentHidden, removeSelectedComponent, toggleComponentLocked } from '../../../store/slice/components'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolBar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  type ToolType = {
    title: string
    icon: React.ReactNode
    fn: () => void
    type?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined
  }

  const tools: ToolType[] = [
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
        dispatch(
          changeComponentHidden({
            fe_id: selectedId,
            isHidden: true,
          })
        )
      },
    },
    {
      title: '锁定',
      icon: <LockOutlined />,
      fn: () => {
        dispatch(
          toggleComponentLocked({
            fe_id: selectedId,
          })
        )
      },
      type: isLocked ? 'primary' : 'default',
    },
  ]

  return (
    <Space>
      {tools.map((t, i) => {
        return (
          <Tooltip title={t.title} key={i + 1}>
            <Button shape="circle" type={t.type} icon={t.icon} onClick={t.fn}></Button>
          </Tooltip>
        )
      })}
    </Space>
  )
}

export default EditToolBar
