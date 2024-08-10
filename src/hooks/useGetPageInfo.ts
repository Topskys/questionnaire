import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { PageInfoType } from '../store/slice/pageInfo'

// 获取redux的页面信息
function useGetPageInfo() {
  const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoType
  return pageInfo
}

export default useGetPageInfo
