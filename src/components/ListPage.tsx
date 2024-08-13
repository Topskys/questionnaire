import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '../constant'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropsType = {
  total: number
}

/**
 * 分页组件
 * @param props
 * @returns
 */
export default function ListPage(props: PropsType) {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  const [searchParams] = useSearchParams()

  // 从url获取参数设置current和pageSize，同步到Pagination组件
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    setCurrent(page)
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setPageSize(pageSize)
  }, [searchParams])

  // 拼接url的参数跳转页面
  const nav = useNavigate()
  const { pathname } = useLocation()

  // 监听current和pageSize的变化，同步到url
  const handlePageChange = (page: number, pageSize: number) => {
    // 给url设置需要最新的参数
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    // 跳转页面
    nav({
      pathname,
      search: searchParams.toString()
    })
  }

  return (
    <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange} />
  )
}
