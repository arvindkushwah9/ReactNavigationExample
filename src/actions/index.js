import { BASE_URL, LOCAL_URL } from '../helpers/globalPaths'
import Interceptor from '../helpers/interceptor'
import { showMessage, hideMessage } from "react-native-flash-message";

export const getUser = data => {
  return {
    type: 'GET_USER',
    payload: data,
  }
}


export const getUsers = data => {
  return {
    type: 'GET_USERS',
    payload: data,
  }
}


export const getVegetables = (params) => {
  url = `${LOCAL_URL}api/v1/vegetables`

  return dispatch => {
    dispatch({
      type: 'LOAD_SPINNER',
      payload: true
    })
    console.log("getVegetables actions called")
    fetch(url, {
      method: 'GET',
      headers: Interceptor.getHeaders(),   
    }).then(response => {
      console.log(response)
      if (response.status == 401) {
        console.log('ERROR!!', data)
        showMessage({
            message: 'FAILED',
            description: response.message,
            type: "danger",
          });
      
      } else {
        response.json().then(data => {
          if (data.status == 401) {
            console.log('ERROR!!2', data)
            showMessage({
                message: response.message,
                description: data.data.errors[0],
                type: "danger",
              });           
          }
          else {
           console.log('SUCCESS!!')
          showMessage({
            message: "SUCCESS!",
            description: data.message,
            type: "success",
          });
          
          dispatch({
            type: 'LIST_VEGETABLES',
            payload: { data: data, response: response },
          })
        }
        })
      }
    })
  }
}