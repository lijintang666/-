// pages/order/order.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
            orderDataList:[]
      },
      // 删除订单
      delOrder(e){
            // console.log(e.target.dataset.pos);
            let pos = e.target.dataset.pos;
            this.data.orderDataList.splice(pos, 1)
            this.setData({
                  orderDataList: this.data.orderDataList
            })
            // 同步下本地的数据
            wx.setStorageSync("order", this.data.orderDataList)
      },
      toDetails() {
            // console.log(id)
            wx.navigateTo({
                  url: '../detail/detail',
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
            this.setData({
                  orderDataList: wx.getStorageSync('order')
            })
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