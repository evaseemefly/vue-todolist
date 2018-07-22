import axios from 'axios';
import cookie from '../common/js/cookie';

let host = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;
// http request 拦截器
axios.interceptors.request.use(
    config => {
      let token = cookie.getCookie('token');
      console.log(token);
      if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.authorization = `JWT ${token}`;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    });
   
  // http response 拦截器
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 返回 401 清除token信息并跳转到登录页面
            router.replace({
              path: '/login'
            });
        }
      }
      return Promise.reject(error.response.data);   // 返回接口返回的错误信息
    });
//   Vue.prototype.$http = axios;
// axios.defaults.withCredentials = true;
//登录
export const login = params => {
    return axios.post(`${host}/api-token-auth/`, params)
}

export const getAuthDetail = parmas => {
    return axios.get(`${host}/user/detail/`)
}

export const getDepDutyList = paramas => {
    return axios.get(`${host}/user/duthdepdutylist/`)
}