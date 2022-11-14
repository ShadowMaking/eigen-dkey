import * as React from 'react'
import Loadable from 'react-loadable'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
// import Home from './pages/Home'
// import Page from './pages/Page'

function Loading() {
    return <div>Loading...</div>
}

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ './pages/Home'),
    loading: Loading
})

const Page = Loadable({
    loader: () => import(/* webpackChunkName: "page" */ './pages/Page'),
    loading: Loading
})


function App() {
    return(
        <div>
            <Router>
                <Routes>
                    <Route  path="/" element={<Home/>}/>
                    <Route  path="/page" element={<Page/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App