import React, { FC } from 'react'
import styles from './QuestionInput.module.scss'

type PropsType = {
  fe_id: string // 组件id
  props: {
    title: string // 标题
    placeholder?: string // 占位符
  }
}

const QuestionInput: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder = '' } = props
  return (
    <>
      <p className={styles.title}>{title}</p>
      <div className={styles['input-wrapper']}>
        <input name={fe_id} placeholder={placeholder} />
      </div>
    </>
  )
}

export default QuestionInput
