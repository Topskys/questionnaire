import React, { FC } from 'react'
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface'
import { Input, Typography } from 'antd'

const { Paragraph } = Typography

const Component: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default Component
