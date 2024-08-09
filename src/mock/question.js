import Mock from 'mockjs'

const Random = Mock.Random

export default [
  {
    url: '/question/:id',
    type: 'GET',
    response(options) {
      console.log('id', options)
      return {
        code: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
          isStar: Random.boolean(),
          componentList: [
            {
              fe_id: Random.id(),
              type: 'questionTitle', // unique
              title: '标题',
              props: {
                text: '个人信息调研',
                level: 1,
                isCenter: false
              } // 右侧属性
            },
            {
              fe_id: Random.id(),
              type: 'questionInput',
              title: '输入框',
              props: {
                text: '姓名',
                placeholder: '请输入内容'
              }
            }
          ]
        },
        msg: 'ok'
      }
    }
  }
]
