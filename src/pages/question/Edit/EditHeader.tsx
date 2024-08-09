import React, { FC } from 'react'
import styles from './EditHeader.module.scss'
import { Button, Space, Typography } from 'antd'
import { LeftOutlined, CheckOutlined, SendOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolBar from './EditToolBar'

const { Title } = Typography

const EditHeader: FC = () => {
  const navigate = useNavigate()

  //   保存
  const handleSave = () => {}

  // 发布
  const handlePublish = () => {}

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Title>标题内容</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolBar></EditToolBar>
        </div>
        <div className={styles.right}>
          <Space>
            <Button icon={<CheckOutlined />} onClick={handleSave}>
              保存
            </Button>
            <Button type="primary" icon={<SendOutlined />} onClick={handlePublish}>
              发布
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
