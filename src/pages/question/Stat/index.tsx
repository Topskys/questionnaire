import React from 'react'
import { Spin, Result, Button } from 'antd'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import styles from './index.module.scss'
import StatHeader from './StatHeader'

export default function Stat() {
  const navigate = useNavigate()
  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()

  // 修改网站标题 （也可document.title='xx'）
  useTitle(`问卷分析 - ${title}`)

  // loading组件
  const LoadingElement = () => (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  )

  function getContentElement() {
    // 页面刷新时isPublished为undefined，先判断类型以解决频繁闪动redux的问题
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该问卷尚未发布"
            subTitle="请先发布问卷再查看统计结果"
            extra={
              <Button type="primary" onClick={() => navigate(-1)}>
                返回
              </Button>
            }
          />
        </div>
      )
    }
    return (
      <>
        <div className={styles.left}></div>
        <div className={styles.main}></div>
        <div className={styles.right}></div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>{loading ? <LoadingElement /> : getContentElement()}</div>
      </div>
    </div>
  )
}
