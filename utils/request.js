// 设置 基地址
const BASH_URL = 'http://localhost:3000'

// 请求 首页 的数据 的接口方法
const request = (options) => {
  return new Promise((resolve, reject) => {

    // 请求 发送前 开启 loading
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })

    wx.request({
      url: BASH_URL + options.url,
      success: (res) => {
        const {message, status} = res.data
        if (status === 0) {
          resolve(message)
        } else {
          reject('接口验证码错误!')
        }

      },
      fail (err) {
        reject('请求数据有误:' + err)
      },
      complete () {
        //  这个方法 接口调用结束的回调函数

        // 请求结束 后 关闭 loading
        wx.hideLoading()
      }
    })

  })
}

// 微信 登录 请求 数据的 接口方法
const apiSetLogin = (options, userInfo) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASH_URL + options.url,
      method: 'post',
      data: {
        code: userInfo.code,
        nickname: userInfo.nickName,
        avatar: userInfo.avatarUrl
      },
      success: (res) => {
        console.log(res)
        const {status, token} = res.data
        if (status === 0) {
          resolve(token)
        } else {
          reject('接口验证码错误!')
        }
      },
      fail (err) {
        reject('请求数据有误:' + err)
      }
    })

  })
}

// 获取个人 信息 接口请求
const apiGetMyInfo = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASH_URL + options.url,
      header: {
        Authorization: options.token
      }, success: (res) => {
        console.log(res)
        const {status, message} = res.data
        if (status === 0) {
          //  说明数据 请求成功 把 请求成功的 数据返回
          resolve(message)
        } else {
          //  数据请求失败
          reject('接口数据有误!')
        }
      },
      fail (err) {
        reject('请求数据有误:' + err)
      }
    })
  })
}

// 获取 手机验证码
const apiGetPhoneCode = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASH_URL + options.url,
      data: {
        phone: options.code
      },
      success: (res) => {
        console.log(res)
        const {status, vcode} = res.data
        if (status === 0) {
          //  获取  验证码成功
          resolve(vcode)
        } else {
          reject('接口请求错误')
        }
      },
      fail (err) {
        reject('请求数据有误:' + err)
      }
    })
  })
}

// 手机号码 进行 登录 的请求
const apiUserLogin = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASH_URL + options.url,
      method: 'post',
      data: {
        phone: options.phone,
        vcode: options.code
      },
      success: (res) => {
        console.log(res)
        const {status, token} = res.data
        if (status === 0) {
          //  请求成功返回
          resolve(token)
        } else {
          reject('接口数据错误!')
        }
      },
      fail: (err) => {
        reject('请求数据错误:' + err)
      }
    })
  })
}

// 返回 对象
export {
  request,
  apiSetLogin,
  apiGetMyInfo,
  apiGetPhoneCode,
  apiUserLogin
}
