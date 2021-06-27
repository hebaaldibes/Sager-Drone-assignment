import React,{useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {AppContext} from '../../../AppContextApi/contexts/AppContext'
import * as appActionType from '../../../AppContextApi/actions/AppActions'

function Header() {
    const {appState,appDispatch} = useContext(AppContext)
    const storage = localStorage.length>0 ?JSON.parse(localStorage.appState):appState
    const isLogin = storage.isLogin
    const userInfo = storage.userInfo

    let history = useHistory();

    const handelLogout =e =>{
        appState.isLogin=false
        appState.userInfo={}
        appState.userOfCountry=[]
        appState.selectedUserInfo={}

        appDispatch({
            type: appActionType.Update_AppState,
            newInputValue: appState
        });
        history.push("/")
    }

    const handleUserNameClick = e=>{
        appState.selectedUserInfo = userInfo
        appDispatch({
            type: appActionType.Update_AppState,
            newInputValue: appState
        });
        history.push(`/userProfile`)
    }

    return (
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Link to="/" className="d-flex align-items-center col-sm-6 col-md-3 mb-2 ms-2 mb-md-0 text-dark text-decoration-none">
            <h4 className="text-info">Sager Drone</h4>
        </Link> 
        {isLogin?
            <div className="col-md-4 text-end">
                <span className="me-3 userName" onClick={handleUserNameClick}>{userInfo.strUserName}</span>
                <button type="button" className="btn btn-info me-3 text-white" onClick={handelLogout}>Logout</button>
            </div>
            :<div className="col-md-4 text-end">
            <Link to="/login" className="btn btn-outline-info me-2">Login</Link>
            <Link to="sign-up" className="btn btn-info me-3 text-white">Sign-up</Link>
            </div>
        }
      </header>
    )
}

export default Header

