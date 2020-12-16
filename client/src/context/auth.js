import React,{ useReducer , createContext} from "react";
import jwtDecode from  "jwt-decode";
import {LOGIN, LOGOUT} from "./types";

const inititalState = {
    user: null
}

if(localStorage.getItem('jwt')){
    const decodedToken = jwtDecode(localStorage.getItem('jwt'));
    console.log(decodedToken);

    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem("jwt")
    }
    else{
        inititalState.user = decodedToken;

    }

}
const AuthContext = createContext({
    user:null,
    login: (data)=>{},
    logout:()=>{}
})

function authReducer(state, action){
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('jwt', action.payload.token)
            return {
                ...state, 
                user: action.payload
            }
    case LOGOUT:
        localStorage.removeItem('jwt')
        return {
            ...state, 
            user: null
        }
        default:
            break;
    }
}

function AuthProvider (props){
    const [state, dispatch] = useReducer(authReducer, inititalState);
    
    function login (data){

        dispatch({
            type: LOGIN,
            payload: data
        })

    }

    function logout (){

        dispatch({
            type: LOGOUT,
        })

    }
    return (
        <AuthContext.Provider 
         value={{user: state.user, login, logout}}
         {...props}
        />
    )
}

export {AuthContext, AuthProvider} 