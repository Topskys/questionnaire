import React from 'react'
import styles from '@/styles/Question.module.scss'
import PageWrapper from '@/components/PageWrapper'
import { getQuestionById } from '@/services/question'
import { getComponent } from '@/components/QuestionComponents'

type PropsType = {
  errno?: number
  data: {
    id: string
    title: string
    desc?: string
    js?: string
    css?: string
    isPublished?: boolean
    isDeleted?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    componentList: Array<any>
  }
  msg?: string
}

export default function Question(props: PropsType) {
  const { errno, data, msg = '' } = props

  // 数据错误
  if (errno !== 0) {
    return (
      <PageWrapper title="错误">
        <p>Error</p>
        <div>{msg}</div>
      </PageWrapper>
    )
  }

  const { id, title = '', desc = '', isDeleted, isPublished, componentList = [] } = data || {}

  // 问卷已删除
  if (isDeleted) {
    return (
      <PageWrapper title="错误" desc={desc}>
        <p>{title}</p>
        <div>该问卷已被删除</div>
      </PageWrapper>
    )
  }

  // 问卷未发布
  if (!isPublished) {
    return (
      <PageWrapper title="错误" desc={desc}>
        <p>{title}</p>
        <div>该问卷尚未发布</div>
      </PageWrapper>
    )
  }

  // 遍历组件
  const ComponentListElem = (
    <>
      {componentList.map(c => {
        const ComponentElem = getComponent(c)
        return (
          <div className={styles.componentWrapper} key={c.fe_id}>
            {ComponentElem}
          </div>
        )
      })}
    </>
  )

  return (
    <PageWrapper title={`填写问卷 - ${title}`}>
      <form action="/api/answer" method="POST">
        {/* 隐藏输入框 */}
        <input type="hidden" name="questionId" value={id} />
        {/* 遍历组件区域 */}
        {ComponentListElem}
        {/* 表单提交按钮区域 */}
        <div className={styles['submitBtnContainer']}>
          {/* <input type="submit" value="提交"/> */}
          {/* or */}
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  )
}

/**
 * Server Side Rendering 动态渲染
 * @param context
 * @description 在此获取参数，请求数据，返回给页面
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  const { id } = context.params
  // 根据id请求问卷数据
  const resData = await getQuestionById(id)

  return {
    // 返回给页面，like：Question页面
    props: {
      ...resData
    }
  }
}
