import React, { FC } from 'react'
import styles from './QuestionTextarea.module.scss'

type PropsType = {
  fe_id: string // 组件id
  props: {
    title: string // 标题
    placeholder?: string // 占位符
  }
}

const QuestionTextarea: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder = '' } = props
  return (
    <>
      <p>{title}</p>
      <div className={styles['textarea-wrapper']}>
        <textarea name={fe_id} placeholder={placeholder} rows={5}/>
      </div>
    </>
  )
}

export default QuestionTextarea
