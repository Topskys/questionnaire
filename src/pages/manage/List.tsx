import React, { useState } from 'react'
import styles from './list.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography } from 'antd'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography

export default function List() {
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
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length > 0 &&
          questionList.map((q, i) => {
            const { _id } = q
            return <QuestionCard key={_id + i} {...q} />
          })}
      </div>
      <div className={styles.pagination}>load more...</div>
    </>
  )
}
