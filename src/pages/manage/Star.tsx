import React, { useState } from 'react'
import styles from './list.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography } from 'antd'

const { Title } = Typography

export default function Star() {
  useTitle('芮艾格德问卷 - 星标问卷')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questionList, setQuestionList] = useState([
    {
      _id: '1ew',
      title: '问卷1',
      isStar: true,
      isPublished: false,
      answerCount: 0,
      createdAt: '2024-08-12'
    }
  ])

  useTitle('芮艾格德问卷 - 我的问卷')

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}></div>
      </div>
      <div className={styles.content}>
        {questionList.length > 0 &&
          questionList.map((q, i) => {
            const { _id } = q
            return <QuestionCard key={_id + i} {...q} />
          })}
      </div>
      <div className={styles.pagination}>分页</div>
    </>
  )
}
