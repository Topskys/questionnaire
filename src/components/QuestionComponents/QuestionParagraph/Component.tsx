import React from 'react'
import { Typography } from 'antd'
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface'

const { Paragraph } = Typography

const Component: React.FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

  // 解析text实现换行 不推荐 01
  // const formatText = text.replaceAll('\n', '<br>')

  const textList = text.split('\n') // 02

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {/* <span dangerouslySetInnerHTML={{ __html: formatText }}></span> 01*/}
      {textList.map((t, index) => {
        return (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        )
      })}
    </Paragraph>
  )
}

export default Component
