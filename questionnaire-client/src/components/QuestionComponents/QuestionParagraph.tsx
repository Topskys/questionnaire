import { CSSProperties, FC } from 'react'

type PropsType = {
  // fe_id:string // 可以不要
  text: string
  isCenter?: boolean
}

const QuestionParagraph: FC<PropsType> = (props: PropsType) => {
  const { text, isCenter } = props

  const style: CSSProperties = {}
  if (isCenter) style.textAlign = 'center'

  // 处理换行
  const textList = text.split('\n')

  return (
    <p style={style}>
      {textList.map((t, index) => {
        return (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        )
      })}
    </p>
  )
}

export default QuestionParagraph
