import { useTitle } from 'ahooks'
import { Button, Empty, message, Modal, Space, Table, Tag, Typography } from 'antd'
import React, { useState } from 'react'
import styles from './Trash.module.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography

const { confirm } = Modal

export default function Trash() {
  useTitle('芮艾格德问卷 - 回收站')

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
  const [selectedIds, setSelectedIds] = useState<string[]>([])

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

  const handleRestore = () => {
    // TODO: 恢复问卷
    message.success(`恢复成功${JSON.stringify(selectedIds)}`)
  }

  const handleDel = () => {
    confirm({
      title: '确认删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后不可恢复',
      onOk: () => {
        message.success(`删除成功${JSON.stringify(selectedIds)}`)
      }
    })
  }

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
        {questionList.length > 0 ? (
          <>
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button type="primary" disabled={selectedIds.length === 0} onClick={handleRestore}>
                  恢复
                </Button>
                <Button disabled={selectedIds.length === 0} danger onClick={handleDel}>
                  彻底删除
                </Button>
              </Space>
            </div>
            <Table
              columns={columns}
              dataSource={questionList}
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
      <div className={styles.pagination}>分页</div>
    </>
  )
}
