import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  timeout: 10 * 1000
})

instance.interceptors.request.use(
  config => {
    // config.headers['Authorization'] = 'Bearer ' + token;
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => {
    const res = (response.data || {}) as ResDataType
    const { errno, data, msg } = res
    if (errno !== 0) {
      if (msg) {
        message.error(msg)
      }
      throw new Error(msg)
    }
    console.log(new Date(), 'response', data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data as any
  },
  error => {
    message.error(error.message)
    return Promise.reject(error)
  }
)

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
