import React, { FC, useEffect } from 'react'
import { QuestionInputPropsType } from './interface'
import { Form, Input } from 'antd'

// 右侧-属性组件
const PropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder, onChange } = props
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
    >
      <Form.Item
        label={'标题'}
        name="title"
        rules={[
          {
            required: true,
            message: '请输入标题',
          },
        ]}
      ></Form.Item>
      <Form.Item label={'Placeholder'} name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
