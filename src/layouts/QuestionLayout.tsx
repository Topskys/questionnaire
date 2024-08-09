import React from 'react'
import styles from './style/QuestionLayout.module.scss'
import { Outlet } from 'react-router-dom'

export default function QuestionLayout() {
  return (
    <div className={styles.layout}>
      <Outlet></Outlet>
    </div>
  )
}
