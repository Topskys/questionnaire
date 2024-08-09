export type OptionType = {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string // 当前选中

  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean // 锁定（用于isLocked）
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '输入框',
  isVertical: false,
  options: [
    { value: 'option1', text: '选项1' },
    { value: 'option2', text: '选项2' },
    { value: 'option3', text: '选项3' }
  ],
  value: ''
}
