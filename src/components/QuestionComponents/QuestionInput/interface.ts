export type QuestionInputPropsType = {
  title?: string
  placeholder?: string

  onChange?: (newProps: QuestionInputPropsType) => void
  disabled?: boolean // 锁定（用于isLocked）
}

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: '输入框',
  placeholder: '请输入内容'
}
