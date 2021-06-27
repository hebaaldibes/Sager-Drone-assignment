/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import {AppContext} from '../../AppContextApi/contexts/AppContext'
import * as appActionType from '../../AppContextApi/actions/AppActions'

function SignUp() {
    const {appState,appDispatch} = useContext(AppContext)
    let history = useHistory();

    const [formValue, setformValue] = useState({strUserName:"", strUserEmail:"",strUserPassword:"",strUserImgName:"",strUserPhone:"",strUserCountry:""})
    const [confirmPassword, setconfirmPassword] = useState("")
    const [isPasswordmatch, setisPasswordmatch] = useState(true)
    const [isformValid, setisformValid] = useState(true)

    const [isUserListLoading, setisUserListLoading] = useState(true);
    const [isSignUpLoading, setisSignUpLoading] = useState(true);
    const [userData, setUserData] = useState("");
    const [userListData, setUserListData] = useState([]);

    const requestSignUpObject ={
        query:`
            mutation{
                addUser(userInput:{
                strUserName:"${formValue.strUserName}",
                strUserEmail:"${formValue.strUserEmail}",
                strUserPassword:"${formValue.strUserPassword}",
                strUserPhone:"${formValue.strUserPhone}",
                strUserImgName:"${formValue.strUserImgName}",
                strUserCountry:"${formValue.strUserCountry}"
                }){
                intUserId
                strUserName
                strUserEmail
                strUserPassword
                strUserPhone
                strUserImgName
                strUserCountry
                }
            }`
    };

    const requestUserListObject ={
        query:`{
            getUsersByCountry(strUserCountry:"${formValue.strUserCountry}") {
                intUserId
                strUserName
                strUserEmail
                strUserPassword
                strUserImgName
                strUserPhone
                strUserCountry
            }
        }`
    };

    async function handleSignUpRequest(){
        await fetch("http://localhost:4000/graphql",{
        method: 'POST',
        body: JSON.stringify(requestSignUpObject),
        headers: {'Content-Type': 'application/json'}
        })
        .then(res =>{
        if(res.status !== 200 && res.status !==201){
        console.log("Failed to request the server");
        }
        return res.json();
        })
        .then(response =>{
        setTimeout(() =>{
            setisSignUpLoading(false)
            setUserData(response.data)
        },3000)
        })
        .catch(err =>{
        console.log(err)
        })
    }
    async function handleUserListRequest(){
        await fetch("http://localhost:4000/graphql",{
        method: 'POST',
        body: JSON.stringify(requestUserListObject),
        headers: {'Content-Type': 'application/json'}
        })
        .then(res =>{
        if(res.status !== 200 && res.status !==201){
        console.log("Failed to request the server");
        }
        return res.json();
        })
        .then(response =>{
        setTimeout(() =>{
            setisUserListLoading(false)
            setUserListData(response.data.getUsersByCountry)
        },3000)
        })
        .catch(err =>{
        console.log(err)
        })
    }

    const handelBlurCountry =e=>{
        if(formValue.strUserCountry !==""){
            handleUserListRequest()
        }
    }

    const handelBlurPassword =e=>{
        if(formValue.strUserPassword !=="" && confirmPassword !==""){
            if(formValue.strUserPassword !== confirmPassword){
                setisPasswordmatch(false)
            }
        }
    }
    const handleSubmit= e=>{
        if(formValue !=={} && formValue.strUserName !=="" && formValue.strUserEmail !=="" && formValue.strUserPassword !=="" && formValue.strUserPhone!=="" && formValue.strUserCountry !==""){
            handleSignUpRequest()
        }
        else{
            setisformValid(false)
        }
    }
    useEffect(() => {
        if(!isSignUpLoading ){
            appState.isLogin = true
            appState.userInfo = userData.addUser
    
            appDispatch({
                type: appActionType.Update_AppState,
                newInputValue: appState
            });
            history.push("/")
        }
    }, [userData])

    useEffect(() => {
        if(!isUserListLoading){
            appState.userOfCountryList = userListData
    
            appDispatch({
                type: appActionType.Update_AppState,
                newInputValue: appState
            });
        }
    }, [userListData])

    return (
        <div className="paperContainer">
            <div className="row paper-wrap p-3">
                <div className="col-12 p-2 mt-3 mb-3">
                    <h2>SignUp</h2>
                </div>
                <div className="col-12 p-2">
                    <input type="text" className="form-control" placeholder="Full name" id="fullName" onChange={e=>setformValue(setformValue => {return {...setformValue,strUserName:e.target.value}})} />
                </div>
                <div className="col-12 p-2">
                    <input type="email" className="form-control" placeholder="Email" id="email" onChange={e=>setformValue(setformValue => {return{...setformValue,strUserEmail:String(e.target.value).toLowerCase()}})} />
                </div>
                <div className="col-12 p-2">
                    <input type="number" className="form-control" placeholder="Phone number " id="phoneNumber" onChange={e=>setformValue(setformValue => {return{...setformValue,strUserPhone:String(e.target.value).toLowerCase()}})} />
                </div>
                <div className="col-lg-6 col-md-12 p-2">
                    <input type="password" className="form-control" placeholder="Password" id="password" onChange={e=>setformValue(setformValue => {return{...setformValue,strUserPassword:e.target.value}})} onBlur={handelBlurPassword}/>
                    {!isPasswordmatch?<p className="text-danger">Password confirmation and Password must match</p>:null}
                </div>
                <div className="col-lg-6 col-md-12 p-2">
                    <input type="password" className="form-control" placeholder="Confirm password" id="confirm Password" onChange={e=>setconfirmPassword(e.target.value)}  onBlur={handelBlurPassword}/>
                </div>
                <div className="col-12 p-2">
                    <input type="text" className="form-control" placeholder="Your country" id="country" onChange={e=>setformValue(setformValue => {return{...setformValue,strUserCountry:String(e.target.value).toLowerCase()}})} onBlur={handelBlurCountry}/>
                </div>
                <div className="col-12 p-2">
                    <button type="submit" className="btn btn-info submitButton text-uppercase" onClick={handleSubmit}>SignUp</button>
                </div>
                <div className="col-12 p-2">
                    <Link to="/login" className="link-info text-decoration-none fs-5">Login</Link>
                </div>
            </div>
            {!isformValid?
                <div className="alert alert-danger">
                    All fields are required!
                </div>
                :null
            }
        </div>

    )
}

export default SignUp
