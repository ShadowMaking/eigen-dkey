import * as React from 'react'
import Loadable from 'react-loadable'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
// import Home from './pages/Home'
// import Page from './pages/Page'
import 'antd/dist/antd.less';

function Loading() {
    return <div>Loading...</div>
}

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ './pages/Home'),
    loading: Loading
})

const Create = Loadable({
    loader: () => import(/* webpackChunkName: "page" */ './pages/Create'),
    loading: Loading
})


function App() {
    return(
        <div>
            <Router>
                <Routes>
                    <Route  path="/" element={<Home/>}/>
                    <Route  path="/create" element={<Create/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App