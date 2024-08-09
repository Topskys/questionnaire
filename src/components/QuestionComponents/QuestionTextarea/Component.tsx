import React, { FC } from 'react'
import { QuestionTextareaDefaultProps, QuestionTextareaPropsType } from './interface'
import { Input, Typography } from 'antd'

const { Paragraph } = Typography
const { TextArea } = Input

const Component: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}

export default Component
