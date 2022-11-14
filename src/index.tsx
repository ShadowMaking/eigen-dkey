import * as React from 'react'
import * as ReactDom from 'react-dom/client'
import './index.scss'
import { Button } from 'antd'
import 'antd/lib/button/style/index.less'
import Popup from './popup'


const root = ReactDom.createRoot(document.querySelector('#root') as any)

root.render(<Popup/>)
