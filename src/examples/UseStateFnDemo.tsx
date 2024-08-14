import { useState } from 'react'

/**
 * 优化：对于数据结构复杂，计算成本高的场景，将数据作为函数传入useState，缓存数据，避免每次组件更新都重新计算
 * 组件更新时都会重新执行useState方法，
 * 如果useState方法声明的数据量大结构复杂，
 * 每次组件更新都会重新计算，就会很消耗性能，
 * 而传入函数，只会在组件第一次渲染时执行一次，
 * 传入的函数会被缓存
 */
function genArr() {
  // 2-2
  console.log('genArr...') // 只会在组件第一次渲染时执行一次
  const arr = new Array(100).fill('hi')
  return arr
}

export default function UseStateFnDemo() {
  console.log('UseStateFnDemo...')
  // const [arr,setArr]=useState(['1','b']); // 1 组件更新时都会重新计算，消耗性能
  const [arr, setArr] = useState(genArr) // 2-1
  const handleClick = () => {
    setArr([...arr, 'hi'])
  }

  return (
    <>
      <p>length：{arr.length}</p>
      <button onClick={handleClick}>add</button>
    </>
  )
}
