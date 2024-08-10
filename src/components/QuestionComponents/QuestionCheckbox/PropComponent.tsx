import React, { FC, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { QuestionCheckboxPropsType } from './interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

// 右侧-属性组件
const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, list = [], isVertical, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, list, isVertical])

  // 将发生变化的表单数据同步到父组件，在同步至redux中
  function handleValueChange() {
    if (onChange == null) return
    const newValues = form.getFieldsValue()
    if (newValues.list) {
      newValues.list = newValues.list.filter(o => !(o.text == null)) // 过滤掉空选项
    }
    const { list = [] } = newValues
    list.forEach(item => {
      if (item.value) return
      item.value = nanoid() // 补选项的value
    })
    onChange(newValues)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, list, isVertical }}
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
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, i) => (
                <Space key={key} align="baseline">
                  {/* Checkbox */}
                  <Form.Item name={[name, 'checked']} valuePropName="checked">
                    <Checkbox></Checkbox>
                  </Form.Item>

                  {/* 当前选项输入框 */}
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      {
                        validator: (_, text) => {
                          const { list = [] } = form.getFieldsValue()
                          let num = 0
                          list.forEach(item => {
                            if (item.text === text) num++ // 判断是否有重复的选项，禁止相同text
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
                  onClick={() => add({ text: '', value: '', checked: false })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
