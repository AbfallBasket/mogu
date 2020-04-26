// pages/authorize/index.js
import { apiSetLogin } from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success () {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function (res) {
                  console.log(res.userInfo)
                  const {nickName, avatarUrl} = res.userInfo
                  //  授权成功，则进行 登录请求然后跳转
                  this.getAuthorize(nickName, avatarUrl)
                }
              })
            }
          })

        }
      }
    })
    console.log('加载authori页面')
  },
  getAuthorize (nickName, avatarUrl) {
    // 发送 微信 登录 请求
    wx.login({
      async success (res) {
        if (res.code) {
          console.log(res)
          console.log(res.code)
          //发起网络请求
          const token = await apiSetLogin({
            url: '/api/user/wxlogin'
          }, {
            code: res.code,
            nickName: nickName,
            avatarUrl: avatarUrl
          })
          //  微信 登录 成功后 存储 token ,跳转到我的页面
          wx.setStorageSync('token', token)
          wx.showToast({
            title: '微信授权登录成功'
          })
          //  登录 成功 直接跳转到 my的页面
          wx.switchTab({
            url: '/pages/my/my'
          })
          console.log('我跳转了')
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
