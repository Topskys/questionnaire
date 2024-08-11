import { useRequest } from 'ahooks'
import React, { useState } from 'react'
import { getQuestionStatListService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import { Pagination, Spin, Table, Typography } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { STAT_PAGE_SIZE } from '../../../constant'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const { Title } = Typography

function PageStat(props: PropsType) {
  const { id = '' } = useParams()
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, {
        page,
        pageSize
      })
      return res
    },
    {
      onSuccess: res => {
        const { total, list = [] } = res
        setList(list)
        setTotal(total)
      },
      refreshDeps: [id, page, pageSize] // 当page或pageSize变化时，重新发起请求
    }
  )

  const { componentList = [] } = useGetComponentInfo()
  // 根据组件列表生成表格列
  const columns = componentList.map(c => {
    const { fe_id, title, props = {}, type } = c
    const colTitle = props!.title || title // 在此!表示关闭类型检查，强制获取title
    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataSource = list.map((item: any) => ({
    ...item,
    key: item._id
  }))

  return (
    <div>
      <Title level={4}>答卷数量：{!loading && total}</Title>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Spin />
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            rowKey="key"
            size="small"
          />
          <Pagination
            total={total}
            current={page}
            pageSize={pageSize}
            onChange={p => setPage(p)}
            onShowSizeChange={(page, pageSize) => {
              setPage(page)
              setPageSize(pageSize)
            }}
          />
        </>
      )}
    </div>
  )
}

export default PageStat
