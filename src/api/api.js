import axios from 'axios';

let host = 'http://127.0.0.1:8000';

//登录
export const login = params => {
    return axios.post(`${host}/api-token-auth/`, params)
}

export const getAuthDetail=parmas=>{
    return axios.get('${host}/user/detail/')
}