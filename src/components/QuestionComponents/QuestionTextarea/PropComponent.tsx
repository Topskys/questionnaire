import React, { FC, useEffect } from 'react'
import { QuestionTextareaPropsType } from './interface'
import { Form, Input } from 'antd'

const { TextArea } = Input

// 右侧-属性组件
const PropComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  // 将发生变化的表单数据同步到父组件，在同步至redux中
  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label={'标题'}
        name="title"
        rules={[
          {
            required: true,
            message: '请输入标题'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="placeholder">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
