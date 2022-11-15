import * as React from 'react'
import './index.scss'
import EigenIcon from '@assets/images/logo.png'

function Home() {
    return (
        <div className="container">
            <div className="icon">
                111
                <img src={EigenIcon} alt=""/>
                <p className="eigenName">EigenSafe</p>
                <p className="eigenDesc">Simple, Sage and Reliable</p>
            </div>
            <div className="login">
                Google Login
            </div>
        </div>
    )
} 

export default Home