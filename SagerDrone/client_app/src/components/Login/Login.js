/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {AppContext} from '../../AppContextApi/contexts/AppContext'
import * as appActionType from '../../AppContextApi/actions/AppActions'

function Login() {
    const {appState,appDispatch} = useContext(AppContext)
    let history = useHistory();

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState("");
    const [isloginLoading, setisloginLoading] = useState(true);
    const [isUserListLoading, setisUserListLoading] = useState(true);
    const [isLogin, setisLogin] = useState(false)
    const [userCountry, setUserCountry] = useState("")
    const [userListData, setUserListData] = useState([]);

    const [vewAlert, setvewAlert] = useState(false)

    //query 
    const requestLoginObject ={
        query:`{
        loginUser(strUserEmail:"${userEmail}",strUserPassword:"${password}"){
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

    const requestUserListObject ={
        query:`{
            getUsersByCountry(strUserCountry:"${userCountry}") {
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
  
    async function handleLoginRequest(){
        await fetch("http://localhost:4000/graphql",{
        method: 'POST',
        body: JSON.stringify(requestLoginObject),
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
            setisloginLoading(false)
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
const handleSubmit=event=>{
    event.preventDefault();
    if(!isUserListLoading && !isloginLoading &&isLogin){
        appState.isLogin = isLogin
        appState.userInfo = userData.loginUser
        appState.userOfCountryList = userListData

        appDispatch({
            type: appActionType.Update_AppState,
            newInputValue: appState
        });
        history.push("/")
    }
}
    const handelBlurForm =e=>{
        if(password !== "" && userEmail !=="" ){
            handleLoginRequest()
        }
    }

    useEffect(() => {
        if(!isloginLoading && userData !== ""){
           if(userData.loginUser === null){
               setvewAlert(true);
          }
          else{
               setisLogin(true)
               setUserCountry(userData.loginUser.strUserCountry)
               setvewAlert(false);
       }
       }
   }, [isloginLoading,userData])
   
    useEffect(() => {
       if(userCountry !==""){
           handleUserListRequest()
       }
   }, [userCountry])

    return (
        <React.Fragment>
            <div className="container">
                <div className="row paper-wrap p-3">
                    <div className="col-12 p-2 mt-3 mb-3">
                        <h2>Login</h2>
                        <p>login here using your email and password</p>
                    </div>
                    <div className="col-12 p-2">
                        <input type="email" className="form-control" placeholder="Email" id="email" onChange={(e) =>setUserEmail(e.target.value)} onKeyUp={handelBlurForm}/>
                    </div>
                    <div className="col-12 p-2">
                        <input type="password" className="form-control" placeholder="Password" id="password" onChange={(e) =>setPassword(e.target.value)} onKeyUp={handelBlurForm}/>
                    </div>
                    <div className="col-12 p-2 mt-2">
                        <button type="submit" className="btn btn-info submitButton text-uppercase" onClick={handleSubmit}>Login</button>
                    </div>
                    <div className="col-12 p-2">
                        <Link to="/sign-up" className="link-info text-decoration-none fs-5">Sign-up</Link>
                    </div>
                </div>
            </div>
            {vewAlert?
                <div className="alert alert-danger">
                    All fields are required!
                </div>
                :null
            }
        </React.Fragment>
    )
}

export default Login