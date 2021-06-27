import * as appActionType from '../actions/AppActions'
const AppReducer=(state, action)=> {

  switch (action.type) {
    
    case appActionType.Update_AppState:
      localStorage.setItem('appState', JSON.stringify(state));
      return { ...state };
    default:
      return state;
  }
}

export default AppReducer