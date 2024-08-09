/**
 * @description 问卷 标题
 * @author Topskys
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一
  Component, // 画布展示
  PropComponent, // 右侧-属性组件
  defaultProps: QuestionTitleDefaultProps
}
