import React, { useState } from 'react'
import styles from './list.module.scss'
import QuestionCard from '../../components/QuestionCard';
import { useTitle } from 'ahooks';

export default function List() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questionList, setQuestionList] = useState([])

  useTitle('芮艾格德问卷 - 我的问卷')
  
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
            questionList.map(q=>{
                const {id}=q;
                return <QuestionCard key={id} {...q} />
            })
        }
    </div>
    <div className={styles.pagination}></div>
  </> 
}
