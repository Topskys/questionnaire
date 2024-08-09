/**
 * @description 问卷 单选框
 * @author Topskys
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionRadioDefaultProps } from './interface'

export * from './interface'

export default {
  title: '单选框',
  type: 'questionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps
}
