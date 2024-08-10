import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent
} from '../store/slice/components'

function isActiveElementValid() {
  const activeElement = document.activeElement
  // 没有增加dnd-kit可通过这种方式实现删除
  return activeElement === document.body // 光标没有 focus 到 input

  // 添加dnd-kit后，消除dnd-kit对删除功能的影响
  // if (activeElement === document.body) return true
  // if (activeElement?.matches('div[role="button"]')) return true
  // return false
}

/**
 *
 * 绑定EditCanvas键盘事件钩子
 */
function useBindCanvasKeyPress() {
  const dispatch = useDispatch()

  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    // 如果当前有输入框被选中，则不执行删除操作
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    // 如果当前有输入框被选中，则不执行复制操作
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    // 如果当前有输入框被选中，则不执行粘贴操作
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  // 选中上一个
  useKeyPress('uparrow', () => {
    // 'uparrow' -- 40
    // 如果当前有输入框被选中，则不执行粘贴操作
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  // 选中上下个
  useKeyPress('uparrow', () => {
    // 'uparrow' -- 40
    // 如果当前有输入框被选中，则不执行粘贴操作
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })
}

export default useBindCanvasKeyPress
