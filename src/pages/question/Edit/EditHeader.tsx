import React, { type ChangeEvent, type FC, useState } from 'react'
import { Button, Input, message, Space, Typography } from 'antd'
import {
  LeftOutlined,
  CheckOutlined,
  SendOutlined,
  EditOutlined,
  LoadingOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import EditToolBar from './EditToolBar'
import styles from './style/EditHeader.module.scss'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { changePageTitle } from '../../../store/slice/pageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { updateQuestionService } from '../../../services/question'

const { Title } = Typography

// 显示或修改问卷标题
const TitleElement: FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)

  // 监听input值的变化，同步页面的问卷标题 redux store
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }

  // 点击编辑图标，进入编辑状态
  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChange}
      />
    )
  }

  // 显示标题
  return (
    <Space>
      <Title level={3} style={{ marginBottom: '0', fontSize: '16px' }}>
        {title}
      </Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}

// 保存按钮
const SaveButton: FC = () => {
  // 根据id保存pageInfo和componentList
  const { id } = useParams() // 获取当前URL的/api/.../:id
  const pageInfo = useGetPageInfo()
  const { componentList } = useGetComponentInfo()

  const { run: save, loading } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, {
        ...pageInfo,
        componentList
      })
    },
    {
      // 手动执行
      manual: true
    }
  )

  // 快捷键保存 01
  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault() // 阻止网页默认行为 （保存）
    if (!loading) save()
  })

  // 自动保存 02 （不用定时保存，应该监听内容变化而保存，防抖可减少服务器压力）
  // useEffect(() => {
  //   run()
  // },[pageInfo, componentList])
  useDebounceEffect(
    // 该钩子带有防抖功能
    () => {
      save()
    },
    [pageInfo, componentList],
    {
      wait: 1000 // 防抖
    }
  )

  // 点击保存 03
  return (
    <Button
      icon={loading ? <LoadingOutlined /> : <CheckOutlined />}
      loading={loading}
      disabled={loading}
      onClick={save}
    >
      保存
    </Button>
  )
}

// 发布按钮
const PublishButton: FC = () => {
  const { id } = useParams() // 获取当前URL的/api/.../:id
  const pageInfo = useGetPageInfo()
  const { componentList } = useGetComponentInfo()
  const navigate = useNavigate()

  const { run: publish, loading } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true // 标志问卷已经被发布
      })
    },
    {
      manual: true,
      onSuccess() {
        message.info('问卷发布成功')
        navigate('/question/stat/' + id) // 去统计页面
      },
      onError() {
        message.error('问卷发布失败，请稍后重试')
      }
    }
  )

  return (
    <Button
      onClick={publish}
      type="primary"
      disabled={loading}
      loading={loading}
      icon={<SendOutlined />}
    >
      发布
    </Button>
  )
}

// 编辑页-头部
const EditHeader: FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <TitleElement />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolBar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
