import { useTitle } from 'ahooks'
import React from 'react'
import styles from './Register.module.scss'
import { Button, Form, Input, Space, Typography } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'

const { Title } = Typography

// [formik表单规则效验](formik.org) 编写麻烦
// [Ant Design 表单验证](https://ant.design/components/form/#Form.Item)
// [react-hook-form]()

export default function Register() {
  useTitle('芮艾格德问卷 - 注册')

  const [form] = Form.useForm()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const handleFinish = (values: any) => {
    // TODO: 注册
  }

  // 处理失败
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={3}>
            <UserAddOutlined />
          </Title>
          <Title level={3}>注册新用户</Title>
        </Space>
      </div>
      <div className={styles.form}>
        <Form
          form={form}
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[
              { required: true, message: '账号不能为空' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: '账号长度在5-20位之间'
              },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '账号只能包含字母、数字和下划线' }
            ]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            hasFeedback
            dependencies={['password']}
            rules={[
              { required: true, message: '确认密码不能为空' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('两次输入的密码不一致'))
                  }
                }
              }) 
            ]}
          >
            <Input.Password placeholder="请输入确认密码" />
          </Form.Item>
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: '昵称不能为空' }]}
          >
            <Input placeholder="请输入用户昵称" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
