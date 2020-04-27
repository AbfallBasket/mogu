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
      method: options.method,
      data: options.data,
      header: options.header,
      success: (res) => {
        const {status} = res.data
        if (status === 0) {
          resolve(res.data)
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
// 返回 对象
export {
  request
}
