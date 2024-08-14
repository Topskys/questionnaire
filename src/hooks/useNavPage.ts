import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import { useEffect } from 'react'
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo
} from '../router'

/**
 * 判断用户登录信息
 * @param waitingUserData 是否正在获取用户信息
 */
function useNavPage(waitingUserData: boolean) {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { username } = useGetUserInfo()

  useEffect(() => {
    if (waitingUserData) return
    if (username) {
      // 已经登录
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
    } else if (!isNoNeedUserInfo(pathname)) {
      // 不需要登录
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage
