import { BASE_URL, LOCAL_URL } from '../helpers/globalPaths'

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
