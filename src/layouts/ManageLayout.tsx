import React from 'react'
import styles from './ManageLayout.module.css'
import { Outlet } from 'react-router-dom'

export default function ManageLayout() {
  return (
    <div className={styles.container}>
        <div className={styles.left}></div>
        <div className={styles.right}>
            <Outlet/>
        </div>
    </div>
  )
}
