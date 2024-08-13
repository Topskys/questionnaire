import { useRequest, useTitle } from 'ahooks'
import { Button, Empty, message, Modal, Space, Table, Tag, Typography } from 'antd'
import React, { useState } from 'react'
import styles from './Trash.module.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import Loading from '../../components/Loading'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
import { deleteQuestionsService, updateQuestionService } from '../../services/question'

const { Title } = Typography

const { confirm } = Modal

export default function Trash() {
  useTitle('芮艾格德问卷 - 回收站')

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const { loading, data = {}, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { total = 0, list = [] } = data

  const columns = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return (
          <Tag color={isPublished ? 'processing' : ''}>{`${isPublished ? '已' : '未'}发布`}</Tag>
        )
      }
    },
    {
      title: '答卷',
      dataIndex: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt'
    }
  ]

  // 恢复
  const { run: handleRestore } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖时间
      onSuccess: () => {
        message.success('恢复成功')
        refresh() // 手动刷新问卷列表
        setSelectedIds([]) // 清空选中
      }
    }
  )

  // 彻底删除
  const { run: handleDelete } = useRequest(async () => deleteQuestionsService(selectedIds), {
    manual: true,
    debounceWait: 500, // 防抖时间
    onSuccess: () => {
      message.success('删除成功')
      refresh() // 手动刷新问卷列表
      setSelectedIds([]) // 清空选中，否则按钮可用
    }
  })

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading ? (
          <Loading />
        ) : list.length > 0 ? (
          <>
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" disabled={selectedIds.length === 0} onClick={handleRestore}>
                  恢复
                </Button>
                <Button
                  disabled={selectedIds.length === 0}
                  danger
                  onClick={() => {
                    confirm({
                      title: '确认删除该问卷？',
                      icon: <ExclamationCircleOutlined />,
                      content: '删除后不可恢复',
                      onOk: handleDelete
                    })
                  }}
                >
                  彻底删除
                </Button>
              </Space>
            </div>
            <Table
              columns={columns}
              dataSource={list}
              pagination={false}
              rowKey={q => q._id}
              rowSelection={{
                type: 'checkbox',
                onChange: selectedRowKeys => {
                  setSelectedIds(selectedRowKeys as string[])
                }
              }}
            />
          </>
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
