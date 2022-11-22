import React, { useState, useEffect } from 'react'
import Tip from '@components/Tip'
import Icon from '@assets/images/icon_s.png'
import User from '@assets/images/user_icon.png'
import './index.scss'
import { Button } from 'antd';

function Account() {

    const handleBtnClick = () => {

    }

    return (
        <div className="container">
            <div className="header">
                <img src={Icon} alt="" width={55} height={55}/>
                <span className="desc">Security Tools</span>
                <img src={User} alt=""/>
            </div>
            <div className="content">
                <div className="back">Account</div>
                <div className="detail">
                    <span className="myAccount">My Account</span>
                    <div className="accountDetail">Account #2</div>
                </div>
            </div>
            <div className="footer">
                <Button type="primary"  onClick={handleBtnClick}>
                    Exit
                </Button>
            </div>
        </div>
    )
} 

export default Account