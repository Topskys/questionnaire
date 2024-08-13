import React from 'react'
import styles from './list.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Empty, Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import Loading from '../../components/Loading'

const { Title } = Typography

export default function List() {
  useTitle('芮艾格德问卷 - 我的问卷')

  // const [list, setList] = useState([])
  // const [total, setTotal] = useState(0)
  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionListService()
  //     const { total = 0, list = [] } = data
  //     setList(list)
  //     setTotal(total)
  //   }
  //   load()
  // }, [])

  // 取代上面的useEffect片段
  // const { loading, data = {} } = useRequest(getQuestionListService)
  // 使用hooks代替
  const { loading, data = {} } = useLoadQuestionListData({})
  const { total = 0, list = [] } = data

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
      <div className={styles.pagination}>load more...{total}</div>
    </>
  )
}
