import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/slice/components'
import { getQuestionService } from '../services/question'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  // 手动ajax加载
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('id is required')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true
    }
  )

  // 根据获取的data，设置redux store
  useEffect(() => {
    if (!data) return
    const { componentList = [] } = data
    // 设置componentList和默认selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    dispatch(resetComponents({ componentList, selectedId }))
  }, [data])

  // 根据id变化，执行ajax请求
  useEffect(() => {
    run(id)
  }, [id])

  return {
    loading,
    error
  }
}

export default useLoadQuestionData
