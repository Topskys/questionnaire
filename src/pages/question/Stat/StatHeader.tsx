import React, { useMemo, useRef } from 'react'
import styles from './style/StatHeader.module.scss'
import { Button, Input, InputRef, message, Popover, Space, Tooltip, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { CopyOutlined, EditOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import QrCode from 'qrcode.react'

const { Title } = Typography

export default function StatHeader() {
  const { id } = useParams()
  const nav = useNavigate()
  const { title, isPublished } = useGetPageInfo()
  const urlInputRef = useRef<InputRef>(null)

  //   拷贝问卷链接
  const handleCopy = () => {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select() // 选中input内容
    document.execCommand('copy') // 执行浏览器复制选中命令
    message.success('拷贝成功')
  }

  // function genLinkAndQrCodeElement() {
  //   if (!isPublished) return null
  //   // 需要参考C端的规则 生成URL二维码
  //   const url = `http://localhost:3000/question/${id}`

  //   const QrCodeElem = (
  //     <div style={{ textAlign: 'center' }}>
  //       <QrCode value={url} size={150} />
  //     </div>
  //   )

  //   return (
  //     <Space>
  //       <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
  //       <Tooltip title="拷贝链接">
  //         <Button icon={<CopyOutlined />} onClick={handleCopy} />
  //       </Tooltip>
  //       <Popover content={QrCodeElem} placement="bottom">
  //         <Button icon={<QrcodeOutlined />}></Button>
  //       </Popover>
  //     </Space>
  //   )
  // }

  /**
   * 优化：使用useMemo缓存生成链接和二维码组件
   * 什么时候使用useMemo?
   * 1. 依赖项不经常发生变化
   * 2. 缓存的元素创建成本高
   */
  const memoLinkAndQrCodeElem = useMemo(() => {
    if (!isPublished) return null
    // 需要参考C端的规则 生成URL二维码
    const url = `http://localhost:3000/question/${id}`

    const QrCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QrCode value={url} size={150} />
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={handleCopy} />
        </Tooltip>
        <Popover content={QrCodeElem} placement="bottom">
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }, [isPublished, id])

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles['content']}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title level={5} style={{ marginBottom: '0' }}>
              {title}
            </Title>
          </Space>
        </div>
        <div className={styles.main}>{memoLinkAndQrCodeElem}</div>
        <div className={styles.right}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => nav(`/question/edit/${id}`)}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}
