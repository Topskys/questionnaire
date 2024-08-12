import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import List from '../pages/manage/List'
import Star from '../pages/manage/Star'
import Trash from '../pages/manage/Trash'
import Edit from '../pages/question/Edit'
import Stat from '../pages/question/Stat'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        // 登录
        path: 'login',
        element: <Login />
      },
      {
        // 注册
        path: 'register',
        element: <Register />
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            // 我的问卷
            path: 'list',
            element: <List />
          },
          {
            // 我的收藏
            path: 'star',
            element: <Star />
          },
          {
            // 回收站
            path: 'trash',
            element: <Trash />
          }
        ]
      },
      {
        path: '*', // 404 写在最后
        element: <NotFound />
      }
    ]
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        // 问卷编辑
        path: 'edit/:id',
        element: <Edit />
      },
      {
        // 问卷统计
        path: 'stat/:id',
        element: <Stat />
      }
    ]
  }
])

export default router
