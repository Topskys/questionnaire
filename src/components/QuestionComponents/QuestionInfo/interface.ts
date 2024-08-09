export type QuestionInfoPropsType = {
  title?: string
  desc?: string

  onChange?: (newProps: QuestionInfoPropsType) => void
  disabled?: boolean // 锁定（用于isLocked）
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述'
}
