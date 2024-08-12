import React, { useState } from 'react'
import styles from './list.module.scss'
// import QuestionCard from '../../components/QuestionCard';

export default function List() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questionList, setQuestionList] = useState([])
  return <>
    <div className={styles.header}>
        <div className={styles.left}>
            <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>

        </div>
    </div>
    <div className={styles.content}>
        {
            // questionList.map(q=>{
            //     const {id}=q;
            //     return <QuestionCard key={id} {...q} />
            // })
        }
    </div>
    <div className={styles.pagination}></div>
  </> 
}
