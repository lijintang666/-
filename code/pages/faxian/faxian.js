// pages/faxian/faxian.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
            faxianDataList:[]
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
            var _this = this;
            // 请求数据
            wx.request({
                  url: 'http://127.0.0.1:10000/',
                  method: 'get',
                  success: function (res) {
                       _this.setData({
                             faxianDataList: res.data.result
                       })
                  //      console.log(_this.data.faxianDataList)
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