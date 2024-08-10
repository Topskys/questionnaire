import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/slice/pageInfo'

const { TextArea } = Input

export default function PageSetting() {
  const pageInfo = useGetPageInfo()
  //   const { title, js, css, desc } = pageInfo
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  const handleValuesChange = () => {
    // 同步到redux store
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="问卷标题" name="title">
        <Input placeholder="请输入问卷标题" />
      </Form.Item>
      <Form.Item label="页面描述" name="desc">
        <TextArea placeholder="请输入页面描述" />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="请输入页面样式代码" />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="请输入页面脚本代码" />
      </Form.Item>
    </Form>
  )
}
