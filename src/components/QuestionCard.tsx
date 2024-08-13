import React, { useState } from 'react'
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
import { useRequest } from 'ahooks'
import { duplicateQuestionService, updateQuestionService } from '../services/question'

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

  // 修改标星按钮
  const [isStarState, setStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess: () => {
        setStarState(!isStarState) // 修改状态，更新页面
        message.success('已更新')
      }
    }
  )

  // 复制按钮
  const { loading: duplicateLoading, run: handleDuplicate } = useRequest(
    async () => await duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess: res => {
        message.success('复制成功')
        const { id } = res
        if (id) {
          nav(`/question/edit/${id}`)
        }
      }
    }
  )

  // 删除按钮
  const [isDeleted, setIsDeleted] = useState(false)
  const { loading: deleteLoading, run: handleDelete } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功')
        setIsDeleted(true)
      }
    }
  )

  // 对于已经删除的问卷，不再显示
  if (isDeleted) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={`/question/${isPublished ? 'stat' : 'edit'}/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: '#fadb14' }} />}
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
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确认要复制该问卷？"
              okText="确认"
              cancelText="取消"
              onConfirm={handleDuplicate}
            >
              <Button type="text" size="small" icon={<CopyOutlined />} disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              disabled={deleteLoading}
              onClick={() => {
                confirm({
                  title: '确认删除该问卷？',
                  icon: <ExclamationCircleOutlined />,
                  onOk: handleDelete
                })
              }}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
