import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../services/question'
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY
} from '../constant'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

/**
 * 问卷管理获取问卷列表数据钩子
 */
function useLoadQuestionListData(opt: Partial<OptionType>) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams] // 当searchParams变化时，重新请求
    }
  )

  return {
    data,
    loading,
    error,
    refresh
  }
}

export default useLoadQuestionListData
