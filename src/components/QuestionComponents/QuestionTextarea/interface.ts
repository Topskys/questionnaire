export type QuestionTextareaPropsType = {
  title?: string
  placeholder?: string

  onChange?: (newProps: QuestionTextareaPropsType) => void
  disabled?: boolean // 锁定（用于isLocked）
}

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '多行文本输入框',
  placeholder: '请输入内容'
}
