import { request } from '../../utils/request'
// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getUserInfo (e) {
    console.log(e)
    console.log('点击获取用户授权')

    if (!e.detail.userInfo) {
      console.log('用户点击拒绝,停止获取 授权')
      return false
    }
    const {nickName, avatarUrl} = e.detail.userInfo
    // 发送 微信 登录 请求
    wx.login({
      async success (res) {
        if (res.code) {
          console.log(res)
          console.log(res.code)
          //发起网络请求
          const data = await request({
            url: '/api/user/wxlogin',
            method: 'post',
            data: {
              code: res.code,
              nickname: nickName,
              avatar: avatarUrl
            }
          })
          //  微信 登录 成功后 存储 token
          wx.setStorageSync('token', data.token)
          wx.showToast({
            title: data.message,
            success () {
              setTimeout(() => {
                //  登录 成功 直接跳转到 my的页面
                wx.switchTab({
                  url: '/pages/my/my'
                })
                console.log('我跳转了')
              }, 1000)

            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

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
