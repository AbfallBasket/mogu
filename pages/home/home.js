import { request } from '../../utils/request'
// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图 数据
    swiperList: [],
    //  课程 数据
    courseList: [],
    //  热门视频
    vedioList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getSwipers()
    this.getetCourse()
    this.getHotVideo()
  },
  async getSwipers () {
    // 获取 轮播图 方法
    const data = await request({
      url: '/api/home/swipers'
    })
    this.setData({
      swiperList: data.message
    })

  },
  async getetCourse () {
    //获取 课程 数据 方法
    const data = await request({
      url: '/api/home/course'
    })
    this.setData({
      courseList: data.message
    })
  },
  async getHotVideo () {
    // 获取 热门视频 方法
    const data = await request({
      url: '/api/home/video'
    })
    this.setData({
      vedioList: data.message
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
