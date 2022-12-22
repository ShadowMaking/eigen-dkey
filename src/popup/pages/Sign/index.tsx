import React, { useState, useEffect, useRef } from 'react'
import Tip from '@components/Tip'
import Icon from '@assets/images/icon_s.png'
import User from '@assets/images/user_icon.png'
import { Input, Button, Progress, Alert } from 'antd';
import { mockKeyGen } from '@/mock';
import { signMap } from '@/common/constants/constans'
import './index.scss'
import  { sign } from '@/common/api'
import { utils } from 'ethers'
import { getFromStorage, getLocationParam, saveToLocalStorage } from  '@/common/utils'
import * as gg18   from '@ieigen/tss-wasm/pkg'

function Sign() {

    const [keyName, setKeyname] = useState('')
    const [btnDisable, setBtnEnable] = useState(false)
    const [done, setDone] = useState(false)
    const [round, setRound] = useState<number>(0)
    const publicKeyRef = useRef('')


    const handleInputChange = (e: any) => {
        setKeyname(e.target.value)
        console.log('xll', keyName)
    }

    const handleBtnClick = () => {
            setBtnEnable(true)
            signMessage()
    }

    const handleSignBtnClick = () => {

    }

    const signMessage = async () => {
        let context
        const delay = 1000
        const digest = utils.keccak256(utils.toUtf8Bytes("EigenTest")).slice(2)
        const user_id = Number(getFromStorage('user_id'))
        const keyAddr = getFromStorage('publicKey')
        const startTime = new Date().getTime()
        let signResInit = await sign({
            digest: digest,
            // user_address: publicKeyRef.current,
            user_address: keyAddr,
            user_id,
            threshold: 1,
            share: 2,
        })
        const keyGenJson = getFromStorage('keygenJson') || ''
        context = await gg18.gg18_sign_client_new_context('http://43.133.35.136:8000', 1, 2, keyGenJson, digest)
        console.log('signInit res context', signResInit, context);
        const endTime = new Date().getTime()
        let sign0 = await sign({
            user_id,
            round: 0
        })
        console.log("sign post: ",sign0); 
        
        context = await gg18.gg18_sign_client_round0(context, delay);
        console.log("sign round0: ");
        let sign1 = await sign({
            user_id,
            round: 1
        })
        
        context = await gg18.gg18_sign_client_round1(context, delay);
        console.log("sign round1: ");
        let sign2 = await sign({
            user_id,
            round: 2
        })
        
        context = await gg18.gg18_sign_client_round2(context, delay);
        console.log("sign round2: ");
        let sign3 = await sign({
            user_id,
            round: 3
        })
        
        context = await gg18.gg18_sign_client_round3(context, delay);
        console.log("sign round3: ");
        let sign4 = await sign({
            user_id,
            round: 4
        })
        
        context = await gg18.gg18_sign_client_round4(context, delay);
        console.log("sign round4: ");
        let sign5 = await sign({
            user_id,
            round: 5
        })
        
        context = await gg18.gg18_sign_client_round5(context, delay);
        console.log("sign round5: ");
        let sign6 = await sign({
            user_id,
            round: 6
        })
        
        context = await gg18.gg18_sign_client_round6(context, delay);
        console.log("sign round6: ");
        let sign7 = await sign({
            user_id,
            round: 7
        })
        
        context = await gg18.gg18_sign_client_round7(context, delay);
        console.log("sign round7: ");
        let sign8 = await sign({
            user_id,
            round: 8
        })
        
        context = await gg18.gg18_sign_client_round8(context, delay);
        console.log("sign round8: ");
        let sign9 = await sign({
            user_id,
            round: 9
        })
       const signJson = await gg18.gg18_sign_client_round9(context, delay);
       console.log("sign round9: signJson", JSON.parse(signJson));

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
                (<div className="signStart">
                    <span className="signBackTip">Please enter the string to sign</span>
                    <div className="signInputName">
                        <Input value={keyName} onChange={handleInputChange}  className="input"/>
                    </div>                    
                </div>)
                : 
                (<div className="progress">
                    <Progress percent={round*20} strokeWidth={25}/>
                    { !done && <div className="roundTips">{signMap[round]}</div> }
                </div>)  } 
                <div className="success">
                { done &&
                    <Alert
                        message="Success Text"
                        description="Recover Address：0xabcd....1234"
                        type="success"
                        closable
                    /> }
                </div> 
            </div>
            <div className="footer">
               <Button type="primary" disabled={btnDisable} onClick={handleBtnClick}>
                    Sign
                </Button> 
            </div>
        </div>
    )
} 

export default Sign