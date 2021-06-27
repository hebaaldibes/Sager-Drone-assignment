import React, { useContext } from 'react'

import {AppContext} from '../../AppContextApi/contexts/AppContext'

import Header from '../shared/header/Header'
import Heroe from '../shared/heroe/Heroe'
import Footer from '../shared/footer/Footer'
import UserList from '../shared/userList/UserList'

function Home() {
    const {appState} = useContext(AppContext)
    const storage = localStorage.length>0 ?JSON.parse(localStorage.appState):appState
    const isLogin = storage.isLogin
    const userList = storage.userOfCountryList

    return (
        <React.Fragment>
            <Header />
            <Heroe />
            {isLogin && userList.length >0 
                ?<UserList />
                :null
            }
            <Footer />
            
        </React.Fragment>
    )
}

export default Home
