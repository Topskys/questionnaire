import React from 'react'
import styles from './QuestionCard.module.css'
import { Button, Space } from 'antd'
import { CopyOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons'

type PropsType = {
  _id: string
  title: string
  isStar?: boolean
  isPublished?: boolean
  answerCount?: number
  createdAt?: string
}

export default function QuestionCard(props: PropsType) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, title, isStar, isPublished, answerCount, createdAt } = props

  const buttons = [
    {
      icon: <StarOutlined />,
      text: '标星',
      handler: () => {}
    },
    {
      icon: <CopyOutlined />,
      text: '复制',
      handler: () => {}
    },
    {
      icon: <DeleteOutlined />,
      text: '删除',
      handler: () => {}
    }
  ]

  const ButtonsElem = (
    <Space>
      {buttons.map((item, index) => {
        const { text, icon, handler } = item
        return (
          <Button type='text' icon={icon} key={index} onClick={handler}>
            {text}
          </Button>
        )
      })}
    </Space>
  )

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <a href="#">{title}</a>
        </div>
        <div className={styles.right}>
          <span
            style={{
              color: isPublished ? 'green' : 'red'
            }}
          >
            {`${isPublished ? '已' : '未'}发布`}
          </span>
          <span>答卷：{answerCount}</span>
          <span>{createdAt}</span>
        </div>
      </div>
      <div className={styles['button-container']}>
        <div className={styles.left}></div>
        <div className={styles.right}>{ButtonsElem}</div>
      </div>
    </div>
  )
}
