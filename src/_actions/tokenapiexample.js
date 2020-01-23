//This is just for template to show off tokenApi

import { tokenApi } from '../util/api'

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

