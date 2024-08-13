import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input

export default function ListSearch() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  //     获取url参数，并设置到search input的value
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const currVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(currVal)
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // 执行搜索
  const handleSearch = (value: string) => {
    // 使用useLocation获取当前url，并修改search参数，
    // 防止页面刷新搜索参数丢失，也可以很好地分享给其他组件，
    // ListSearch、List、Star、Trash都可以通过URL获取search参数（解耦，组件相互独立）
    // navigate(`${pathname}?search=${value}`)
    navigate({
      pathname: pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`
    })
  }
  return (
    <div>
      <Search
        value={value}
        placeholder="Search..."
        onSearch={handleSearch}
        onChange={handleChange}
        enterButton="Search"
        size="large"
        allowClear
        style={{ width: 300 }}
      />
    </div>
  )
}
