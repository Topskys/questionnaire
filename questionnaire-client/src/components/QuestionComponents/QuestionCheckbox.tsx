import React, { FC, useEffect, useState } from 'react'
import styles from './QuestionCheckbox.module.scss'

type PropsType = {
  fe_id: string // 组件id
  props: {
    title: string // 标题
    list: Array<{
      text: string
      value: string
      checked?: boolean
    }> // 选项
    isVertical?: boolean // 是否垂直排列
  }
}

const QuestionCheckbox: FC<PropsType> = ({ fe_id, props }) => {
  const { title, list = [], isVertical } = props
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  // 初始化选中状态
  useEffect(() => {
    list.forEach(item => {
      if (item.checked) {
        setSelectedValues(selectedValues => selectedValues.concat(item.value))
      }
    })
  }, [list])

  // 切换选中
  const toggleChecked = (value: string) => {
    if (selectedValues.includes(value)) {
      // 对于已经选中的，将其从选中列表中移除
      setSelectedValues(selectedValues.filter(v => v !== value))
    } else {
      // 对于未选中的，将其添加到选中列表中
      setSelectedValues(selectedValues.concat(value))
    }
  }

  return (
    <>
      <p>{title}</p>
      {/* 隐藏域 selectedValues.toString() == *.join(',')*/}
      <input type="hidden" name={fe_id} value={selectedValues.toString()} />
      {/* 渲染选项 */}
      <ul className={styles.list}>
        {list.map(item => {
          const { text, value } = item

          // 判断是否垂直排列
          let liClassName = ''
          if (isVertical) liClassName = styles.verticalItem
          else liClassName = styles.horizontalItem

          return (
            <li key={value} className={liClassName}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value)}
                  onChange={() => {
                    toggleChecked(value)
                  }}
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

export default QuestionCheckbox
