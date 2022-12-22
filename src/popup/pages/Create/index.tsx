import React, { useState, useEffect, useRef } from 'react'
import Tip from '@components/Tip'
import Icon from '@assets/images/icon_s.png'
import User from '@assets/images/user_icon.png'
import './index.scss'
import { Input, Button, Progress, Alert } from 'antd';
import { mockKeyGen } from '@/mock';
import { keyGenMap,  signMap } from '@/common/constants/constans'
import { getFromStorage, getLocationParam, saveToLocalStorage } from  '@/common/utils'
import * as gg18   from '@ieigen/tss-wasm/pkg'
// var gg18  = require('@ieigen/tss-wasm')
import { gapi } from 'gapi-script';
import  { keyGen,getAddress,sign } from '@/common/api'
// import { getFromStorage } from '@/common/utils'


function Create() {

    const [keyName, setKeyname] = useState('')
    const [btnDisable, setBtnEnable] = useState(false)
    const [done, setDone] = useState(false)
    const [round, setRound] = useState<number>(0)
    const [showShards, setShowShards] = useState(false)
    const keyGenJsonRef = useRef('')

    useEffect(() => {
        const googleUserId = getLocationParam('id')
        const googleAuthToken = getLocationParam('auth_token')
        if (googleUserId) { 
          saveToLocalStorage({'user_id': googleUserId})
          saveToLocalStorage({'auth_token': googleAuthToken})
        }
    }, []);

    useEffect(() => {
        // gapi.load('client:auth2', initAPIClient);
    },[])

    const updateSigninStatus = (isSignedIn: any) => {
        console.log(isSignedIn);
        if (!isSignedIn) {
            gapi.auth2.getAuthInstance().signIn();

        }
      }

    const initAPIClient = async () => {
        const CLIENT_ID = '432015826885-4iq694b6d27oieugvt13n6rbm709g6jp.apps.googleusercontent.com'
        const API_KEY = 'AIzaSyDDMio8sJrZciin2gZDNpeca1CXSoFGjkY'
        // const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
        // const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
        const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"]
        // Authorization scopes required by the API; multiple scopes can be
        // included, separated by spaces.
        // const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly ' + 'https://www.googleapis.com/auth/gmail.send'
        const SCOPES = 'https://www.googleapis.com/auth/gmail.send'
        // const CLIENT_ID = '362136571953-jqgg4mit33m1a35mhbmpc46ro5d943ce.apps.googleusercontent.com'
        // const API_KEY = 'AIzaSyDvR3_4v_tRV2Igwaaj9Tl-rmejotBJPTk'
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          }).then( () => {
            console.log(1234);
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      
                // Handle the initial sign-in state.
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            // gapi.client.load('drive', 'v3',  function () {
            //     console.log(4567);
            //     let response =  gapi.client.drive.files.list(
            // //         {
            // //   'pageSize': 10,
            // //   'fields': 'files(id, name)',
            // // }
            // );
            // console.log(response);
            });
            
        //   try {
        //    let response = await gapi.client.drive.files.list({
        //       'pageSize': 10,
        //       'fields': 'files(id, name)',
        //     });
        //     console.log(response);
        //   } catch (err) {
        //     console.log(err);
        //   }
    }



    const handleInputChange = (e: any) => {
        setKeyname(e.target.value)
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
                user_id: Number(userId),
                round: round
            })
        } else  {
            return keyGen({
                user_id: Number(userId),
                name: keyName,
                threshold: 1,
                share: 2
            })
        }
    }

    const getShards = async () => {
        let res = await getAddress(302)
        console.log('getShards',res);
        
    }

    const genKey = async () => {
        const startTime = new Date().getTime()
        setRound(1)
        let res0 = await postKeyGen()
        console.log('xll res0', res0);
        
        // const gg181 = await gg18.init();
        let context
        context =  await gg18.gg18_keygen_client_new_context('http://43.133.35.136:8000', 1, 2, 50)
        // console.log('xll', res11)
        // console.log('xll', gg18)
        // console.log('xll2', res11); 
        const endTime = new Date().getTime()
        console.log('xll keyGen Time', endTime - startTime);
        
        let res1 = await postKeyGen(1)
        console.log('xll res1', res1);
        context =  await gg18.gg18_keygen_client_round1(context, 50)
        setRound(1)
        
        let res2 = await postKeyGen(2)
        context =  await gg18.gg18_keygen_client_round2(context, 50)
        console.log('xll res2', res2);
        setRound(2)
        
        let res3 = await postKeyGen(3)
        context =  await gg18.gg18_keygen_client_round3(context, 50)
        console.log('xll res3', res3);
        setRound(3)
        
        let res4 = await postKeyGen(4)
        context =  await gg18.gg18_keygen_client_round4(context, 50)
        console.log('xll res4', res4);
        setRound(4)
        
        // publicKeyRef.current = JSON.parse(context).public_key_address
        saveToLocalStorage({'publicKey': JSON.parse(context).public_key_address})
        let res5 = await postKeyGen(5)
        const  keygen_json  =  await gg18.gg18_keygen_client_round5(context, 50)
        keyGenJsonRef.current = keygen_json
        saveToLocalStorage({'keygenJson': JSON.parse(keygen_json)})
        console.log('xll keyGenJsonRef', keyGenJsonRef.current);
        setRound(5)
        setDone(true)
        setTimeout(() => {
            setShowShards(true)
        }, 1000)
        const finalendTime = new Date().getTime()
        console.log('xll keyGen finalTime', finalendTime - endTime);
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
                <div onClick={getShards}>getUserAddress</div>
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