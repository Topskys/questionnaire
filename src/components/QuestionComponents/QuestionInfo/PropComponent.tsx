import React, { FC, useEffect } from 'react'
import { QuestionInfoPropsType } from './interface'
import { Form, Input } from 'antd'

const { TextArea } = Input

// 右侧-属性组件
const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])

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
      initialValues={{ title, desc }}
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
      <Form.Item label={'描述'} name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
