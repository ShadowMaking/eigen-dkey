import React, { useState, useEffect } from 'react'
import Tip from '@components/Tip'
import Icon from '@assets/images/icon_s.png'
import User from '@assets/images/user_icon.png'
import './index.scss'
import { Button } from 'antd';
import useDrivePicker from 'react-google-drive-picker'
import  { keyGen,getAddress,sign } from '@/common/api'


function Account() {
    const [openPicker, authResponse] = useDrivePicker();  

    useEffect(() => {

    }, [])
    const handleBtnClick = () => {

    }

    const handleBackClick = () => {
        window.location.hash = '#/create'
    }

    const handleOpenPicker = () => {
        const CLIENT_ID = '432015826885-4iq694b6d27oieugvt13n6rbm709g6jp.apps.googleusercontent.com'
        const API_KEY = 'AIzaSyDDMio8sJrZciin2gZDNpeca1CXSoFGjkY'
        openPicker({
            clientId: CLIENT_ID,
            developerKey: API_KEY,
            viewId: "DOCS",
            // token: token, // pass oauth token in case you already have one
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            // customViews: customViewsArray, // custom view
            callbackFunction: (data) => {
              if (data.action === 'cancel') {
                console.log('User clicked cancel/close button')
              }
              console.log(data)
            },
          })
    }

    return (
        <div className="container">
            <div className="header">
                <img src={Icon} alt="" width={55} height={55}/>
                <span className="desc">Security Tools</span>
                <img src={User} alt=""/>
            </div>
            <div className="content">
                <div className="back" onClick={handleBackClick}>Account</div>
                <div className="detail">
                    <span className="myAccount">My Account</span>
                    <div className="accountDetail">
                        <div className="iconArea"></div>
                        <div className="detailArea">
                            <span className="title">Account</span>
                            <span className="mail">xxx@gmail.com</span>
                        </div>
                    </div>
                    <div className="adressArea">
                        <span className="adress">0xabacd1234</span>
                        <span className="copyIcon"></span>
                    </div>
                </div>
            </div>
            <div className="footer">
                <Button type="primary"  onClick={handleBtnClick} className="btn">
                    Exit
                </Button>
                {/* <Button type="primary"  onClick={handleOpenPicker} className="btn">
                    Open Picker
                </Button> */}
                
            </div>
        </div>
    )
} 

export default Account