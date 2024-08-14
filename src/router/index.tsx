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
import { lazy } from 'react'

// 优化：路由懒加载，按需加载，拆分 bundle，优化首页体积，减少首屏加载时间
const Edit = lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/question/Edit'))
const Stat = lazy(() => import(/* webpackChunkName: "statPage" */ '../pages/question/Stat'))
const Example = lazy(() => import(/* webpackChunkName: "examplePage" */ '../examples'))

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
  },
  {
    path: 'example', // 测试demo
    element: <Example />
  }
])

export default router

// ------ 路由常量，常用路由 ------

export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'

// ------ 路由登录验证判断 ------

export function isLoginOrRegister(pathname: string) {
  return [LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)
}

export function isNoNeedUserInfo(pathname: string) {
  return [HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)
}
