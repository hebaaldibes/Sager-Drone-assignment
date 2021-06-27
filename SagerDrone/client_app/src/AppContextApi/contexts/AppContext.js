import React, { createContext, useReducer } from "react";
import AppReducer from '../reducers/AppReducer'

export const AppContext = createContext({}); 

function AppProvider({children}) {
  const appInitialStates = {  
    isLogin:false,
    userInfo:{},
    userOfCountryList:[],
    selectedUserInfo:{}
  };

  const [appState, appDispatch] = useReducer(AppReducer, appInitialStates);

  const value = {appState, appDispatch}

  return (
    <AppContext.Provider value={value}>
      {children}
   </AppContext.Provider>
  )
}

export default AppProvider
