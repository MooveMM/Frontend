//This is just for template to show off tokenApi

import { tokenApi, api } from '../util/api'
import { request, requestFailure,requestSuccess } from '../util/actions'


export function login(username, password){
    return async (dispatch) => {
        dispatch(request("LOGIN_LOGIN_REQUEST"))

        return api("/api/v1/authentication/user/login",
         "POST",
         {
             username: username, 
             password: password
            
         }
         ).then((result) => {
          console.log(result)
          dispatch(requestSuccess("LOGIN_LOGIN_SUCCESS", result))
         }).catch((err) => {
            dispatch(requestFailure("LOGIN_LOGIN_FAILURE", err))
          console.log(err)
         });
      }
}

export function register(username, password){
    return async (dispatch) => {
        dispatch(request("LOGIN_REGISTER_REQUEST"))

        return api("/api/v1/authentication/user/register",
         "POST",
         {
             username: username, 
             password: password
            
         }
         ).then((result) => {
          console.log(result)
          dispatch(requestSuccess("LOGIN_REGISTER_SUCCESS", result))
         }).catch((err) => {
            dispatch(requestFailure("LOGIN_REGISTER_FAILURE", err))
          console.log(err)
         });
      }
}

export function logout(){
    
    return async (dispatch) => {
        console.log("hi")
        dispatch(requestSuccess("LOGIN_LOGOUT"))
      }
}


export function somedummyfunction() {
    console.log("whaat?")
    return async (dispatch) => {
     
      return tokenApi("/api/v1/blockchaintemplate/blockchaintemplate/queryChaincode",
       "GET",
       {
           id: "thisisathing", 
          
       }
       ).then((result) => {
        console.log(result)
         // yay we got a result!
       }).catch((err) => {
        // aww :( )
        console.log(err)
       });
    }
  }

