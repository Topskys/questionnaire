import { QuestionParagraphDefaultProps } from './interface'
import Component from './Component'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '段落',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps
}
