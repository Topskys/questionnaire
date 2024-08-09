import React, { FC, useEffect } from 'react'
import { QuestionRadioPropsType } from './interface'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

// 右侧-属性组件
const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, value, options, isVertical, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, options, value, isVertical })
  }, [title, options, value, isVertical])

  // 将发生变化的表单数据同步到父组件，在同步至redux中
  function handleValueChange() {
    if (onChange == null) return
    const newValues = form.getFieldsValue()
    if (newValues.options) {
      newValues.options = newValues.options.filter(o => !(o.text == null)) // 过滤掉空选项
    }
    const { options = [] } = newValues
    options.forEach(o => {
      if (o.value) return
      o.value = nanoid() // 补选项的value
    })
    onChange(newValues)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, options, value, isVertical }}
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
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, i) => (
                <Space key={key}>
                  {/* 当前选项输入框 */}
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      {
                        validator: (_, text) => {
                          const { options = [] } = form.getFieldsValue()
                          let num = 0
                          options.forEach(opt => {
                            if (opt.text === text) num++ // 判断是否有重复的选项，禁止相同text
                          })
                          if (num > 1) return Promise.reject(new Error('和其他选项文字重复了'))
                          return Promise.resolve()
                        }
                      }
                    ]}
                  >
                    <Input placeholder="请输入选项文字" />
                  </Form.Item>
                  {/* 当前选项删除按钮 */}
                  {i > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                </Space>
              ))}
              {/* 添加选项按钮 */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '' })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item label="默认选中" name="value">
        <Select
          options={options?.map(({ text, value }) => ({ label: text || '', value }))}
          value={value}
          placeholder="请选择"
        />
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="isVertical">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
