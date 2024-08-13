import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import { useEffect } from 'react'
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo
} from '../router'

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
