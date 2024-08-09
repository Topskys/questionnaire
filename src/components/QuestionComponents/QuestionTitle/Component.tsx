import React, { FC } from 'react'
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from './interface'
import { Typography } from 'antd'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }

  const getFontSize = (level: number) => {
    switch (level) {
      case 1:
        return 24
      case 2:
        return 20
      case 3:
        return 16
      default:
        return 16
    }
  }

  return (
    <div>
      <Title
        style={{
          fontSize: `${getFontSize(level)}px`,
          textAlign: isCenter ? 'center' : 'start',
          marginBottom: '0',
        }}
      >
        {text}
      </Title>
    </div>
  )
}

export default QuestionTitle
