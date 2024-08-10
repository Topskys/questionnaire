import React from 'react'
import {
  DndContext,
  MouseSensor,
  useSensors,
  useSensor,
  DragEndEvent,
  closestCenter
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type PropsType = {
  children: JSX.Element | JSX.Element[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Array<{ id: string; [key: string]: any }>
  onDragEnd: (oldIndex: number, newIndex: number) => void
}

export default function SortableContainer({ children, items, onDragEnd }: PropsType) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8 // 鼠标移动8px才认为是拖拽，防误操作
      }
    })
  )

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over == null) return
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.fe_id === active.id)
      const newIndex = items.findIndex(item => item.fe_id === over.id)
      onDragEnd(oldIndex, newIndex)
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
