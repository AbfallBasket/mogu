import { apiGetMyInfo } from '../../utils/request'
// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async getUserInfo (userToken) {
    //  如果 token 存在 说明以 登录 则发送 请求获取个人信息
    const data = await apiGetMyInfo({
      url: '/api/my/info',
      token: userToken
    })
    this.setData({
      userInfo: data
    })
    console.log(data)
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
    // 一进入 页面 就 判断是否 存在 token,如不存在 说明未登录

    console.log('欢迎来的我的页面!')
    const userToken = wx.getStorageSync('token')
    console.log(userToken)
    if (userToken) {
      console.log('token存在!')
      this.getUserInfo(userToken)
    } else {
      console.log('token不存在,应该跳转')
      //  如果 token 不存在 说明未登录 ,跳转到登录页面
      wx.reLaunch({
        url: '../login/index'
      })
      return false
    }
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
