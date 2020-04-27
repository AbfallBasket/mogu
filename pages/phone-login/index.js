import { request } from '../../utils/request'

// pages/phone-login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 手机号码
    phoneNumber: '',
    // 验证码
    vcode: '',
    //  设置 每次点击 验证码 的间隔
    timeLag: 10,
    isTimeLag: false
  },
  async getCode () {
    var timer
    const code = this.data.phoneNumber
    //  发送 验证码之前,判断 手机号码 是否合法
    if (code.trim() === '') {
      return false
    } else {
      // 验证 手机号码 是否合法
      const validatePhone = (code) => {
        const reg = /^1[3,4,5,6,7,8,9][0-9]{9}$/
        return reg.test(code)
      }

      if (validatePhone(code)) {
        // 点击时 如果 isTimeLag 为 true 则说明还在计时
        // 那么就不需要 执行后续代码
        if (this.data.isTimeLag === true) {
          console.log('你还在计时中,请计时完,再继续发送')
          return false
        }
        // 设置 开始计时
        this.setData({
          isTimeLag: true
        })

        // 手机 合法 即可 开启定时器 ,并 发送验证码
        timer = setInterval(() => {
          let tempTime = this.data.timeLag
          tempTime--
          if (tempTime <= 1) {
            // 清除上次定时器
            clearInterval(timer)
            // 如果小于 0了 说明计时结束,需要显示为 获取验证码
            // 然后重置 时间间隔 变量
            this.setData({
              isTimeLag: false,
              timeLag: 10
            })
          } else {
            // 如果 大于0 说明还在计时 ,则每次把 减少的数据
            // 传递给data中的 计时 变量
            this.setData({
              timeLag: tempTime
            })
          }
        }, 1000)

        //  说明手机号码正确 进行后续 获取验证码
        //  发送 请求 验证码的 方法
        const data = await request({
          url: '/api/user/vcode',
          data: {
            phone: code
          }
        })
        console.log(data)
        wx.showToast({
          title: `您的验证码为:${data.vcode}`,
          icon: 'none',
          duration: 3000
        })
      } else {
        wx.showToast({
          title: '手机格式错误',
          icon: 'none'
        })
        return false
      }
    }

  },
  getVcode (e) {

    console.log(e)
    // 失去焦点 时 把 验证码 存储到 data中
    const {value} = e.detail

    // 验证码是否 合法
    const validateCode = (code) => {
      const reg = /^\d{4,}$/
      return reg.test(code)
    }
    if (validateCode(value)) {
      this.setData({
        vcode: value
      })
    } else {
      wx.showToast({
        title: '验证码格式错误',
        icon: 'none'
      })
      return false
    }

  },
  getPhoneNumber (e) {
    console.log(e)

    // 失去焦点 时 把 手机号码 存储到 data中
    const {value} = e.detail
    this.setData({
      phoneNumber: value
    })

  },
  async phoneLogin () {
    //  点击 后 进行 手机号码 登录
    console.log('ddd点击 了登录')
    // 判断 数据是否为空
    if (this.data.phoneNumber === '' || this.data.vcode === '') {
      wx.showToast({
        title: '请输入手机号或验证码后再登录',
        icon: 'none'
      })
      return false
    }
    // 发送 手机号码登录 的请求
    const data = await request({
      url: '/api/user/login',
      method: 'post',
      data: {
        phone: this.data.phoneNumber,
        vcode: this.data.vcode
      }
    })
    // 请求成功后, 获取 token  存储token
    console.log(data)
    //  微信 登录 成功后 存储 token
    wx.setStorageSync('token', data.token)
    wx.showToast({
      title: data.message,
      icon: 'success',
      success () {
        setTimeout(() => {
          //  登录 成功 直接跳转到 my的页面
          wx.switchTab({
            url: '/pages/my/my'
          })
        }, 1000)

      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
