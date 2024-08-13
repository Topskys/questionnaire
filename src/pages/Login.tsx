import { useTitle } from 'ahooks'
import React, { useEffect } from 'react'
import styles from './Login.module.scss'
import { Button, Checkbox, Form, Input, Space, Typography } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { REGISTER_PATHNAME } from '../router'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function forgetUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY)
  }
}

export default function Login() {
  useTitle('芮艾格德问卷 - 登录')

  const [form] = Form.useForm()

  // 组件加载时，从storage获取值初始化表单
  useEffect(() => {
    const { username, password } = getUserFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  // 点击登录执行
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinish = (values: any) => {
    const { password, username, remember } = values || {}
    if (remember) {
      rememberUser(username, password)
    } else {
      forgetUserFromStorage()
    }
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
          <Title level={3}>用户登录</Title>
        </Space>
      </div>
      <div className={styles.form}>
        <Form
          form={form}
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          initialValues={{
            remember: true
          }}
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
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
