import { FC } from 'react'

type PropsType = {
  // fe_id:string // 可以不要
  title: string
  desc?: boolean
}

const QuestionInfo: FC<PropsType> = (props: PropsType) => {
  const { title, desc } = props

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  )
}

export default QuestionInfo
