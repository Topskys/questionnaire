import React from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Divider, message, Modal, Popconfirm, Space, Tag } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

type PropsType = {
  _id: string
  title: string
  isStar?: boolean
  isPublished?: boolean
  answerCount?: number
  createdAt?: string
}

const { confirm } = Modal

export default function QuestionCard(props: PropsType) {
  const { _id, title, isStar, isPublished, answerCount, createdAt } = props

  const nav = useNavigate()

  const buttons = [
    {
      icon: <StarOutlined />,
      text: isStar ? '取消标星' : '标星',
      handler: () => {}
    },
    {
      icon: <CopyOutlined />,
      text: '复制',
      handler: () => {
        message.success('复制成功')
      }
    },
    {
      icon: <DeleteOutlined />,
      text: '删除',
      handler: () => {
        confirm({
          title: '确认删除该问卷？',
          icon: <ExclamationCircleOutlined />,
          onOk: () => {
            message.success('删除成功')
          }
        })
      }
    }
  ]

  const ButtonsElem = (
    <Space>
      {buttons.map((item, index) => {
        const { text, icon, handler } = item
        return (
          <span key={index}>
            {text === '复制' ? (
              <Popconfirm
                title="确认删除吗？"
                okText="确认"
                cancelText="取消"
                onConfirm={() => handler()}
              >
                <Button type="text" icon={icon} size="small">
                  {text}
                </Button>
              </Popconfirm>
            ) : (
              <Button type="text" size="small" icon={icon} onClick={() => handler()}>
                {text}
              </Button>
            )}
          </span>
        )
      })}
    </Space>
  )

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={`/question/${isPublished ? 'stat' : 'edit'}/${_id}`}>
            <Space>
              {isStar && <StarOutlined style={{ color: '#fadb14' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            <Tag color={isPublished ? 'processing' : ''}>{`${isPublished ? '已' : '未'}发布`}</Tag>
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>{ButtonsElem}</div>
      </div>
    </div>
  )
}
