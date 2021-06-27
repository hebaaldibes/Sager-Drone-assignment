import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import profile from '../../img/profile.png'

import {AppContext} from '../../../AppContextApi/contexts/AppContext'
import * as appActionType from '../../../AppContextApi/actions/AppActions'

function UserList() {
    const {appState,appDispatch} = useContext(AppContext)
    const storage = localStorage.length>0 ?JSON.parse(localStorage.appState):appState
    const userID = storage.userInfo.intUserId
    const userList = storage.userOfCountryList
    let history = useHistory();


    const handleClick = (userInfo)=>{
        appState.selectedUserInfo = userInfo
        appDispatch({
            type: appActionType.Update_AppState,
            newInputValue: appState
        });
        history.push(`/userProfile`)
    }

  
    return (
        <div className="container">
            <div className="row align-items-center text-center g-5 py-5">
                <div className="col-12">
                    <h3>Users</h3>
                </div>
                {
                    userList.map(user=>{
                        return(
                            user.intUserId !== userID?
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={user.intUserId} onClick={()=>handleClick(user)}>
                                <div className="card">
                                    <img className="card-img-top" src={user.strUserImgName ===""?profile:user.strUserImgName} alt="profile" />
                                    <div className="card-body">
                                        <h5 className="card-title">{user.strUserName}</h5>
                                    </div>
                                </div>
                            </div>
                            :null
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UserList
