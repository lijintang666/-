// pages/pay/pay.js
const util = require('../../utils/util.js')
Page({

      /**
       * 页面的初始数据
       */
      data: {
            payDataList:[],
            totalPrice:0,
            totalCount:0
      },
      toOrder(){
            // 存储订单数据
            var orderData = {}
            orderData.time = util.formatTime(new Date());
            orderData.count = this.data.totalCount;
            orderData.price = this.data.totalPrice;
            orderData.firstGoods = this.data.payDataList[0].name// 第一个商品的name名称
            // 设置订单本地数据
            var orderStorageData = wx.getStorageSync('order')
            // 重点解析:如果不存在order本地数据的话，就给[],否则获取order本地数据 
            orderStorageData = !orderStorageData ? [] : orderStorageData;
            orderStorageData.unshift(orderData)
            // set订单数据
            wx.setStorageSync('order', orderStorageData)
            // 
            
            // 跳转到Tab底部栏不可使用navigateTo
            wx.switchTab({
                  url: '../order/order',
            })
      },
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (e) {
            console.log(e)
            this.setData({
                  payDataList:wx.getStorageSync('shopcart'),
                  totalPrice: e.totalPrice,
                  totalCount: e.totalCount
            })
            // console.log(util.formatTime(new Date())) // 获取当前时间
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