import axios from 'axios'
const INS = require("./baseUrl");

export function request(config){
  
  // const baseURL = 'http://127.0.0.1:5000'

  const instance = axios.create({
    baseURL: INS.BASE_URL,
    timeout: 5000,
    method: 'post',
    headers: {
      "Content-Type": "application/json;charsetset=UTF-8",
      "authorization": sessionStorage.qatools_token
    },
  })

  instance.interceptors.request.use(config => {
    console.log('config', config);
    return config
  }, err => {
    console.log(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  return instance(config)
}