// pages/location/location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageIndex: null,
    latitude: 39.9042,   // 默认北京
    longitude: 116.4074,
    time:"",
    markers: []

  },

  returnToPicture(){
    wx.navigateTo({
      url: '/pages/picture/picture'
    })
  },

  onMapTap(e) {
    const { latitude, longitude } = e.detail
    this.setData({
      latitude,
      longitude,
      markers: [{
        id: 1,
        latitude,
        longitude,
        width: 30,
        height: 30
      }]
    })
  },

  confirmLocation() {
    const { imageIndex, latitude, longitude } = this.data
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]
  
    // 复制 imageList
    const imageList = [...prevPage.data.imageList]
  
    // 更新位置 + 时间
    imageList[imageIndex] = {
      ...imageList[imageIndex],
      location: { latitude, longitude },
      time: Date.now()
    }
  
    // 更新 prevPage 和本地存储
    prevPage.setData({ imageList })
    wx.setStorageSync('imageList', imageList)
  
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      imageIndex: options.index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})