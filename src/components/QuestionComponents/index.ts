import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea'
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio'
import QuestionCheckboxConf, { QuestionCheckboxPropsType } from './QuestionCheckbox'

// 统一组件的props类型
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType

// 统一组件配置类型
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf, QuestionTextareaConf]
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf]
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf]
  }
]

// 全部组件的配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
