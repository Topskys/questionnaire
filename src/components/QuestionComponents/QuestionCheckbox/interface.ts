export type OptionType = {
  value: string
  text: string
  checked?: boolean
}

export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: OptionType[]

  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean // 锁定（用于isLocked）
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' }
  ]
}

// 统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
  stat: Array<{
    name: string // name
    count: number // value
  }>
}
