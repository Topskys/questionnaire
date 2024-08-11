import QuestionInput from './QuestionInput'
import QuestionRadio from './QuestionRadio'
import QuestionTitle from './QuestionTitle'
import QuestionParagraph from './QuestionParagraph'
import QuestionInfo from './QuestionInfo'
import QuestionTextarea from './QuestionTextarea'
import QuestionCheckbox from './QuestionCheckbox'

type ComponentInfoType = {
  fe_id: string
  type: string
  title?: string
  isHidden?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
}

export const getComponent = (comp: ComponentInfoType) => {
  const { fe_id, type, isHidden, props = {} } = comp

  if (isHidden) return null

  switch (type) {
    case 'questionInput':
      return <QuestionInput key={fe_id} {...props} />
    case 'questionRadio':
      return <QuestionRadio key={fe_id} {...props} />
    case 'questionTitle':
      return <QuestionTitle {...props} />
    case 'questionParagraph':
      return <QuestionParagraph {...props} />
    case 'questionInfo':
      return <QuestionInfo {...props} />
    case 'questionTextarea':
      return <QuestionTextarea key={fe_id} {...props} />
    case 'questionCheckbox':
      return <QuestionCheckbox key={fe_id} {...props} />
    default:
      return null
  }
}
