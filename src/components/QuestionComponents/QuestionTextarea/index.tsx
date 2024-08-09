/**
 * @description 问卷 多行文本输入框
 * @author Topskys
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTextareaDefaultProps } from './interface'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionTextarea',
  Component,
  PropComponent,
  defaultProps: QuestionTextareaDefaultProps
}
