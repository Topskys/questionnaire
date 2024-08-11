import React, { FC } from 'react'
import styles from './QuestionRadio.module.scss'

type PropsType = {
  fe_id: string // 组件id
  props: {
    title: string // 标题
    options: Array<{
      text: string
      value: string
    }> // 选项
  }
  value: string // 当前选中值
  isVertical?: boolean // 是否垂直排列
}

const QuestionRadio: FC<PropsType> = ({ fe_id, value, isVertical, props }) => {
  const { title, options = [] } = props
  return (
    <>
      <p>{title}</p>
      <ul className={styles.list}>
        {options.map(o => {
          const { text, value: val } = o

          // 判断是否垂直排列
          let liClassName = ''
          if (isVertical) liClassName = styles.verticalItem
          else liClassName = styles.horizontalItem

          return (
            <li key={val} className={liClassName}>
              <label>
                <input
                  type="radio"
                  name={fe_id}
                  value={value}
                  defaultChecked={val === value}
                />
                {text}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default QuestionRadio
