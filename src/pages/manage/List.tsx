import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './List.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import { Empty, Typography } from 'antd'
import ListSearch from '../../components/ListSearch'
import Loading from '../../components/Loading'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'

const { Title } = Typography

export default function List() {
  useTitle('芮艾格德问卷 - 我的问卷')
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [started, setStarted] = useState(false) // 优化：因为防抖有延迟时间，用该变量标志是否已经开始加载（消除加载时出现<Empty/>）

  const haveMoreData = total > list.length
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  // 请求数据
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword
      })
      return data
    },
    {
      manual: true,
      onSuccess: result => {
        const { list: newList = [], total = 0 } = result
        setList(list.concat(newList)) // 累计
        setTotal(total)
        setPage(page + 1) // 当前页码+1
        // setStarted(false) // 标志请求结束
      }
    }
  )

  // 防抖并判断根据containerRef(loading...)元素是否漏出屏幕而加载更多数据
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        // 当滚动底部看见elem时，触发加载更多
        load() // 真正加载数据
        setStarted(true)
      }
    },
    {
      wait: 1000 // 1s
    }
  )

  // 1. 当页面加载或url的参数keyword变化时，触发加载更多数据
  useEffect(() => {
    // 初始化
    tryLoadMore()
  }, [searchParams])

  // 2. 当页面滚动时，要尝试触发加载更多数据
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore) // 要考虑防抖
    }
    return () => {
      // 当组件卸载时，移除事件监听
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  // 3. 当keyword变化时重置信息
  useEffect(() => {
    setList([])
    setPage(1)

    setTotal(0)
    setStarted(false)
  }, [keyword])

  // 加载更多dom
  const LoadMoreContentElem = useMemo(() => {
    // 优化：缓存该组件，避免重复渲染，当依赖变化时才重新渲染
    if (!started || loading) return <Loading />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多数据了...</span>
    return <span>正在加载下一页...</span>
  }, [started, loading, haveMoreData])

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
  // const { loading, data = {} } = useLoadQuestionListData({})
  // const { total = 0, list = [] } = data

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
        {list.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.pagination}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}
