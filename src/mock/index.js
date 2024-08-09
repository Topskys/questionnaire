import Mock from 'mockjs'

// others modules
import question from './question'

const baseUrl = '/api'
const mocks = [...question]

Mock.setup({ timeout: 800 })

// mock请求方法放在这里统一处理，
// 1是简便写法，
// 2是如果请求路径需要加统一前缀或域名,可以在这里处理
for (const i of mocks) {
  console.log(i)
  Mock.mock(`${baseUrl}${i.url}`, i.type, i.response)
}
