import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from '../router'
import store from '../store'
// import * as types from '../store/types'

Vue.prototype.axios = axios
// axios 配置
axios.defaults.timeout = 7000
// 后台接口公共前缀
// axios.defaults.baseURL = '/api';
// 线上后台接口  http://api.hostdev.ennjoy.cn http://www.ennjoy.cn/YinKe
axios.defaults.baseURL = 'http://admin.lsiten.cn:8080/'
axios.defaults.withCredentials = true

// POST传参序列化
axios.interceptors.request.use((config) => {
  // let oldData = config.data;
  if (store.state.user.token) {
    if (!config.data) {
      config.data = {}
    }
    // config.headers["Set-Cookie"] = "token:"+store.state.user.token;
  }
  if (config.method === 'post') {
    if (!config.headers['Content-Type']) { config.data = qs.stringify(config.data) } else { config.data = JSON.stringify(config.data) }
  }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  return config
}, (error) => {
  console.log('请求网络异常')
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (res.code === '00') {
    return Promise.reject(res)
  } else if (res.code === '02') {
    router.push({
      name: 'login',
      query: { redirect: router.currentRoute.fullPath }
    })
  }
  return res
}, (error) => {
  console.log('返回数据网络异常')
  if (error.response) {
    switch (error.response.status) {
      case 404:
        // 后台返回的404，后台也可定义为其他 清除token信息并跳转到登录页面
        router.push({
          name: 'login',
          query: { redirect: router.currentRoute.fullPath }
        })
    }
  }
  return Promise.reject(error)
})

export function fetch (url, params, headers) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, headers).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  /* 获取图片上传的signature */
  getSignature (params) {
    return fetch('/Api/UploadFile/GetPolicy', params)
  }
}
