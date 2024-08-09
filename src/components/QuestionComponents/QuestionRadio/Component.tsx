import React, { FC } from 'react'
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface'
import { Radio, Space, Typography } from 'antd'

const { Paragraph } = Typography

const QuestionRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(o => {
            const { value, text } = o
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default QuestionRadio
