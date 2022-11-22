import React, { useState, useEffect } from 'react'
import Tip from '@components/Tip'
import Icon from '@assets/images/icon_s.png'
import User from '@assets/images/user_icon.png'
import './index.scss'
import { Input, Button, Progress } from 'antd';

function Create() {

    const [keyName, setKeyname] = useState('')
    const [btnEnable, setBtnEnable] = useState(false)

    const handleInputChange = (e: any) => {
        setKeyname(e.target.value)
        console.log('1234', keyName)
    }

    const handleBtnClick = () => {
        setBtnEnable(true)
    }

    const text = "Create 2-of-2 thredshould signing key, one part key stores in your Google Drive, the other one stores in our service. Then we can sign a message with these 2 parties."

    return (
        <div className="container">
            <div className="header">
                <img src={Icon} alt="" width={55} height={55}/>
                <span className="desc">Security Tools</span>
                <img src={User} alt=""/>
            </div>
            <div className="content">
                <Tip text={text}/>
                { !btnEnable  ?
                (<div className="start">
                    <span className="backTip">Create key shards and back them up</span>
                    <div className="inputName">
                        <span className="inputTip">Set backup name</span>
                        <Input value={keyName} onChange={handleInputChange} placeholder="Set backup name"  className="input"/>
                    </div>                    
                </div>)
                :
                (<div className="progress">
                    <Progress percent={30} strokeWidth={25}/>
                    <div className="roundTips">Round1</div>
                </div>) }
                <div className="success">

                </div>

            </div>
            <div className="footer">
                <Button type="primary" disabled={btnEnable} onClick={handleBtnClick}>
                    Create
                </Button>
            </div>
        </div>
    )
} 

export default Create