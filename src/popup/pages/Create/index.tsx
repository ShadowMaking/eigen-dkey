import React, { useState, useEffect } from 'react'
import Tip from '@components/Tip'
import Icon from '@assets/images/icon_s.png'
import User from '@assets/images/user_icon.png'
import './index.scss'
import { Input, Button, Progress, Alert } from 'antd';
import { mockKeyGen } from '@/mock';
import { keyGenMap,  signMap } from '@/common/constants/constans'
import { getFromStorage, getLocationParam, saveToLocalStorage } from  '@/common/utils'
import { gg18 } from '@ieigen/tss-wasm'
import  { keyGen } from '@/common/api'
// import { getFromStorage } from '@/common/utils'

function Create() {

    const [keyName, setKeyname] = useState('')
    const [btnDisable, setBtnEnable] = useState(false)
    const [done, setDone] = useState(false)
    const [round, setRound] = useState<number>(0)
    const [showShards, setShowShards] = useState(false)

    useEffect(() => {
        const googleUserId = getLocationParam('id')
        const googleAuthToken = getLocationParam('auth_token')
        if (googleUserId) { 
          saveToLocalStorage({'user_id': googleUserId})
          saveToLocalStorage({'auth_token': googleAuthToken})
        }
    }, []);

    const handleInputChange = (e: any) => {
        setKeyname(e.target.value)
        console.log('xll', keyName)
    }

    const handleBtnClick = () => {
        if (!showShards && round === 0) {
            setBtnEnable(true)
            genKey()
        } else {
            window.location.hash = '/sign'
        }

    }

    const postKeyGen = (round?: number) => {
        const userId = getFromStorage('user_id')
        if (round) {
            return keyGen({
                user_id: userId,
                round: round
            })
        } else  {
            return keyGen({
                user_id: userId,
                name: keyName,
                t: 1,
                n: 2
            })
        }
    }

    const genKey = async () => {
        let res0 = await postKeyGen()
        console.log('xll', res0);
        // let res11 = await gg18.gg18_keygen_client_new_context('43.133.35.136:8000', 1, 2, 50)
        // console.log('xll', res11)
        let res1 = await postKeyGen(1)
        console.log('xll', res1);
        setRound(1)
        let res2 = await postKeyGen(2)
        console.log('xll', res2);
        setRound(2)
        let res3 = await postKeyGen(3)
        console.log('xll', res3);
        setRound(3)
        let res4 = await postKeyGen(4)
        console.log('xll', res4);
        setRound(4)
        let res5 = await postKeyGen(5)
        console.log('xll', res5);
        setRound(5)


        // setDone(true)
        // setTimeout(() => {
        //     setShowShards(true)
        // }, 1000)
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
                { !btnDisable  ?
                (<div className="start">
                    <span className="backTip">Create key shards and back them up</span>
                    <div className="inputName">
                        <span className="inputTip">Set backup name</span>
                        <Input value={keyName} onChange={handleInputChange} placeholder="Set backup name"  className="input"/>
                    </div>                    
                </div>)
                : !showShards ?
                (<div className="progress">
                    <Progress percent={round*20} strokeWidth={25}/>
                    { !done && <div className="roundTips">{keyGenMap[round]}</div> }
                </div>) : null } 
                <div className="success">
                { done &&
                    <Alert
                        message="Success Text"
                        description="Congratulations on the successful creation and backup of the key 
                        partition!"
                        type="success"
                        closable
                    /> }
                </div> 
                 { showShards && <div className="showShards">
                    <span className="tittle">Stored Key Shards</span>
                    <div className="drive">
                        Google Drive
                    </div>
                </div> }
            </div>
            <div className="footer">
               <Button type="primary" disabled={showShards ? false : btnDisable} onClick={handleBtnClick}>
                    {  showShards ? 'Sign' : round > 0 ? 'Creating' : 'Create' }
                </Button> 
            </div>
        </div>
    )
} 

export default Create