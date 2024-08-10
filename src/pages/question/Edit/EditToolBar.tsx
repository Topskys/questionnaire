import React, { FC } from 'react'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {
  changeComponentHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked
} from '../../../store/slice/components'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolBar: FC = () => {
  const dispatch = useDispatch()
  const {
    selectedId,
    selectedComponent,
    copiedComponent,
    componentList = []
  } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  type ToolType = {
    title: string
    icon: React.ReactNode
    fn: () => void
    type?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined
    disabled?: boolean
  }

  const len = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
  const isFirst = selectedIndex <= 0 // 第一个
  const isLast = selectedIndex + 1 >= len // 最后一个

  const tools: ToolType[] = [
    {
      title: '删除',
      icon: <DeleteOutlined />,
      fn: () => {
        dispatch(removeSelectedComponent())
      }
    },
    {
      title: '隐藏',
      icon: <EyeInvisibleOutlined />,
      fn: () => {
        dispatch(
          changeComponentHidden({
            fe_id: selectedId,
            isHidden: true
          })
        )
      }
    },
    {
      title: '锁定',
      icon: <LockOutlined />,
      fn: () => {
        dispatch(
          toggleComponentLocked({
            fe_id: selectedId
          })
        )
      },
      type: isLocked ? 'primary' : 'default'
    },
    {
      title: '拷贝',
      icon: <CopyOutlined />,
      fn: () => {
        dispatch(copySelectedComponent())
      }
    },
    {
      title: '粘贴',
      icon: <BlockOutlined />,
      fn: () => {
        dispatch(pasteCopiedComponent())
      },
      disabled: copiedComponent == null
    },
    {
      title: '上移',
      icon: <UpOutlined />,
      fn: () => {
        if (isFirst) return
        dispatch(
          moveComponent({
            oldIndex: selectedIndex,
            newIndex: selectedIndex - 1
          })
        )
      },
      disabled: isFirst
    },
    {
      title: '上移',
      icon: <DownOutlined />,
      fn: () => {
        if (isLast) return
        dispatch(
          moveComponent({
            oldIndex: selectedIndex,
            newIndex: selectedIndex + 1
          })
        )
      },
      disabled: isLast
    },
    {
      title: '撤销',
      icon: <UndoOutlined />,
      fn: () => {
        dispatch(UndoActionCreators.undo())
      }
    },
    {
      title: '重做',
      icon: <RedoOutlined />,
      fn: () => {
        dispatch(UndoActionCreators.redo())
      }
    }
  ]

  return (
    <Space>
      {tools.map((t, i) => {
        return (
          <Tooltip title={t.title} key={i + 1}>
            <Button
              shape="circle"
              type={t.type}
              icon={t.icon}
              onClick={t.fn}
              disabled={t.disabled}
            ></Button>
          </Tooltip>
        )
      })}
    </Space>
  )
}

export default EditToolBar
