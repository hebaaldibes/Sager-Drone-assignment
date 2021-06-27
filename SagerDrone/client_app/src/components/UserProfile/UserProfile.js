import React, { useContext } from 'react'
import profile from '../img/profile.png'

import {AppContext} from '../../AppContextApi/contexts/AppContext'

import Footer from '../shared/footer/Footer'
import Header from '../shared/header/Header'

function UserProfile() {
    const {appState} = useContext(AppContext)
    const storage = localStorage.length>0 ?JSON.parse(localStorage.appState):appState
    const selectedUserInfo = storage.selectedUserInfo

    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <div className="row align-items-center text-center py-4 d-flex justify-content-center">
                    <div className="col-xs-12 col-lg-5">
                        <div className="m-5 border">
                            <img className="card-img-top" src={selectedUserInfo.strUserImgName ===""?profile:selectedUserInfo.strUserImgName} alt="profile" />
                        </div>
                    </div>
                    <div className="col-xs-12 col-lg-7">
                        <div className="row">
                            <div className='col-12 text-info p-4'>
                                <h5>Personal info</h5>
                            </div>
                            <div className='col-12 border-bottom text-capitalize text-start fs-5 p-3 mb-2'>
                                <span className='text-info p-1'>name:</span>
                                <span>{selectedUserInfo.strUserName}</span>
                            </div>
                            <div className='col-12 border-bottom text-capitalize text-start fs-5 p-3 mb-2'>
                                <span className='text-info p-1'>email:</span>
                                <span className="text-lowercase">{selectedUserInfo.strUserEmail}</span>
                            </div>
                            <div className='col-12 border-bottom text-capitalize text-start fs-5 p-3 mb-2'>
                                <span className='text-info p-1'>phone:</span>
                                <span>{selectedUserInfo.strUserPhone}</span>
                            </div>
                            <div className='col-12 border-bottom text-capitalize text-start fs-5 p-3 mb-2'>
                                <span className='text-info p-1'>country:</span>
                                <span>{selectedUserInfo.strUserCountry}</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default UserProfile
