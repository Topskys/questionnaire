import Mock from 'mockjs'

// others modules
// import question from './question'

const baseUrl = '/api'
const mocks = [{
  url: '/test',
  type: 'get',
  response: () => {
    return {
      code: 200,
      data: Date.now() + '测试mockjs的使用，mockjs不能劫持fetch，只能劫持XMLHttpRequest，可以使用axios（XMLHttpRequest）'
    }
  }
}]

Mock.setup({ timeout: 800 })

// mock请求方法放在这里统一处理，
// 1是简便写法，
// 2是如果请求路径需要加统一前缀或域名,可以在这里处理
for (const i of mocks) {
  Mock.mock(`${baseUrl}${i.url}`, i.type, i.response)
}


// 使用mockjs

// 01 配置mockjs
// const mocks = [{
//   url: '/test',
//   type: 'get',
//   response: () => {
//     return {
//       code: 200,
//       data: Date.now() + '测试mockjs的使用，mockjs不能劫持fetch，只能劫持XMLHttpRequest，可以使用axios（XMLHttpRequest）'
//     }
//   }
// }]

// 02 在需要使用mockjs的页面引入mockjs
// import '../../_mock'

// 03 在需要使用mockjs的页面使用axios请求
// import axios from 'axios'

  // 测试mockjs
  // useEffect(()=>{
  //   axios.get('/api/test').then(res=>{
  //     console.log('----------------------',res.data)
  //   })
  // },[])