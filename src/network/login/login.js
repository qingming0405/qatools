import { request } from "../request"

export function getVersion() {
  return request({
    url: '/getVersion'
  })
}

export function login(account, password) {
  return request({
    url: '/login',
    params: {
      account,
      password
    }
  })
}

export function getTest() {
  return request({
    url: '/api/post'
  })
}