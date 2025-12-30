// picture/picture.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],//// 每一项是 { path, location,标记后也会有标记时间戳time}
    showActionSheet: false,//是否针对图片进行操作
    currentIndex: null // 长按时当前操作的图片索引
  },
  //returnToIndex()功能暂时舍弃
  returnToIndex(){
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  chooseImage() {
    wx.chooseImage({
      count: 9,
      success: (res) => {
        // 把路径包装成对象
        const newImages = res.tempFilePaths.map(path => ({
          path,
          location: null
        }))
        const list = [...this.data.imageList, ...newImages]
        this.setData({
          imageList: list
        })
        wx.setStorageSync('imageList', list)
      }
    })
  },
  
  previewImage(e) {
    const index = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.imageList[index].path,
      urls: this.data.imageList.map(img => img.path)
    })
  },
  
    // 长按图片 → 弹出操作菜单
    showImageAction(e) {
      const index = e.currentTarget.dataset.index
      this.setData({
        currentIndex: index,
        showActionSheet: true
      })
    },
  
    closeActionSheet() {
      this.setData({ showActionSheet: false, currentIndex: null })
    },
  
    // 弹窗按钮：标记位置
    markLocation() {
      const index = this.data.currentIndex
      this.closeActionSheet()
      wx.navigateTo({
        url: `/pages/location/location?index=${index}`
      })
    },
  
    // 弹窗按钮：删除图片
    deleteImageFromSheet() {
      const index = this.data.currentIndex
      wx.showModal({
        title: '确认删除',
        content: '确定要删除这张图片吗？',
        confirmText: '确定',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            let list = [...this.data.imageList]
            list.splice(index, 1)
            this.setData({ imageList: list })
            wx.setStorageSync('imageList', list)
            this.closeActionSheet()
          } else {
            // 用户取消，不做操作
            this.closeActionSheet()
          }
        }
      })
    },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const cache = wx.getStorageSync('imageList') || []
    this.setData({ imageList: cache })
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