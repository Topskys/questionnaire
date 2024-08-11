import React from 'react'
import QuestionInput from '@/components/QuestionComponents/QuestionInput'
import QuestionRadio from '@/components/QuestionComponents/QuestionRadio'
import styles from '@/styles/Question.module.scss'
import PageWrapper from '@/components/PageWrapper'

type PropsType = {
  id: string
}

export default function Question(props: PropsType) {
  return (
    <PageWrapper title="填写问卷">
      <form action="/api/answer" method="POST">
        {/* 隐藏输入框 */}
        <input type="hidden" name="questionId" value={props.id} />
        <div className={styles.componentWrapper}>
          <QuestionInput
            fe_id="c1"
            props={{
              title: 'Question 1',
              placeholder: 'Answer 1'
            }}
          />
        </div>
        <div className={styles.componentWrapper}>
          <QuestionRadio
            fe_id="c2"
            props={{
              title: 'Question 1',
              options: [
                {
                  value: 'male',
                  text: '男'
                },
                {
                  value: 'female',
                  text: '女'
                }
              ]
            }}
            value="male"
            isVertical={false}
          />
        </div>
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
 * Server Side Rendering
 * @param context
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  const { id } = context.params

  return {
    props: {
      id
    }
  }
}
