import * as React from 'react'
import Tip from '@components/Tip'
import Icon from '@assets/images/icon_s.png'
import User from '@assets/images/user_icon.png'
import './index.scss'
import { Input, Button } from 'antd';

function Create() {

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
                <span className="backTip">Create key shards and back them up</span>
                <div className="inputName">
                    <span className="inputTip">Set backup name</span>
                    <Input placeholder="Set backup name" />
                </div>

            </div>
            <div className="footer">
                <Button type="primary">
                    Create
                </Button>
            </div>
        </div>
    )
} 

export default Create