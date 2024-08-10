import React, { FC } from 'react'
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface'
import { Checkbox, Space, Typography } from 'antd'

const { Paragraph } = Typography

const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, list = [], isVertical } = { ...QuestionCheckboxDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>

      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(item => {
          const { value, text, checked } = item
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default Component
