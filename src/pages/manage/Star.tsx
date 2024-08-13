import React from 'react'
import styles from './Star.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Empty, Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import Loading from '../../components/Loading'
import ListPage from '../../components/ListPage'

const { Title } = Typography

export default function Star() {
  useTitle('芮艾格德问卷 - 星标问卷')

  const { loading, data = {} } = useLoadQuestionListData({ isStar: true })
  const { total = 0, list = [] } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading ? (
          <Loading />
        ) : list.length > 0 ? (
          list.map(q => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
      <div className={styles.pagination}>
        <span style={{ display: !loading ? 'block' : 'none' }}>
          <ListPage total={total} />
        </span>
      </div>
    </>
  )
}
