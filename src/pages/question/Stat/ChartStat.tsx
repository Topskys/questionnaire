import { useRequest } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { getComponentStatService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'
import { getComponentConfByType } from '../../../components/QuestionComponents'

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const { Title } = Typography

// 问卷分析 - 图表统计
function ChartStat(props: PropsType) {
  const { id = '' } = useParams()
  const [stat, setStat] = useState([])
  const { selectedComponentId, selectedComponentType } = props

  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess: res => {
        setStat(res.stat)
      }
    }
  )

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId])

  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>
    const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
    if (StatComponent == null) return <div>该组件暂无统计图表</div>
    return <StatComponent stat={stat} />
  }

  return (
    <div>
      <Title level={4}>图标统计</Title>
      <div>{genStatElem()}</div>
    </div>
  )
}

export default ChartStat
