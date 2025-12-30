// map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    markers: [],
    center: { latitude: 39.9, longitude: 116.3 },
    polyline: [],  
    activeMarker: null
  },

  
//returnToIndex()暂时舍弃
  returnToIndex(){
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  onMarkerTap(e) {
    const markerId = e.detail.markerId
    const marker = this.data.markers[markerId]
  
    if (!marker) return 
    this.setData({ activeMarker: marker})

    wx.previewImage({
      current: marker.path,
      urls: this.data.imageList.map(item => item.path)
    })
    
  },
  formatTime(ts) {
    
    if (!ts) return '时间未知'
    const date = new Date(ts)
    return date.toLocaleString()
  },
  
  
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const imageList = wx.getStorageSync('imageList') || []
  
    const markers = imageList
      .filter(item => item.location)
      .map((item, index) => {
        if (!item.location) return null
  
        return {
          id: index,
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          iconPath: '/assets/marker.png',
          width: 32,
          height: 32,
          path: item.path,             // 原图路径
          time: item.time            //时间戳
        }
      })
  
    const center = markers.length
      ? {
          latitude: markers[0].latitude,
          longitude: markers[0].longitude
        }
      : { latitude: 39.9, longitude: 116.3 }
  
    this.setData({imageList,markers,center
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
    const imageList = wx.getStorageSync('imageList') || []

    const sortedList = imageList
    .filter(item => item.location && item.time)
    .sort((a, b) => a.time - b.time)

    const markers = imageList
      .filter(item => item.location)
      .map((item, index) => ({
        id: index,
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        iconPath: '/assets/marker.png',
        width: 32,
        height: 32,
        path: item.path,
        time: item.time,
        displayTime: item.time ? new Date(item.time).toLocaleString() : '时间未知'
      }))
  //绘制曲线
  const polyline = sortedList.length >= 2
  ? [{
      points: sortedList.map(item => ({
        latitude: item.location.latitude,
        longitude: item.location.longitude
      })),
      color: '#007AFF',
      width: 4,
      dottedLine: false
    }]
  : []

    const center = markers.length
      ? { latitude: markers[0].latitude, longitude: markers[0].longitude }
      : this.data.center
  
    this.setData({ imageList, markers, polyline,center })
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