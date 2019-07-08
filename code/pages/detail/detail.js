// pages/detail/detail.js
Page({

      /**
       * 页面的初始数据
       */ 
      data: {
            selected: true,
            selected1: false,
            selected2: false,
            showShopCart:false,
            detailDataList:[],// 详情数据列表
            toView:'go0',// scollView 绑定的id
            shopcartList:[],// 购物车数据
            totalPrice:0,// 总价钱
            totalCount:0,// 总件数
            rulePrice: 20,// 规定价格
            remainPrice:0,// 差价
            isRulePriceFlag:false// 是否达到规定价格
      },
      // 点击分类
      selected() {
            this.setData({
                  selected: true,
                  selected1: false,
                  selected2: false,
                  selected3: false,
            })
      },
      selected1() {
            this.setData({
                  selected: false,
                  selected1: true,
                  selected2: false,
                  selected3: false,
            })
      },
      selected2() {
            this.setData({
                  selected: false,
                  selected1: false,
                  selected2: true,
                  selected3: false,
            })
      },
      // 改变toView的值，to到指定的id
      menu_select(e){
            let index = e.target.dataset.index;
            this.setData({
                  toView: "go"+index.toString()
            })
            // console.log(this.data.toView);
      },
      // 显示购物车
      toShopCar(){
            this.setData({
                  showShopCart: !this.data.showShopCart
            })
            
      },
      // 添加至购物车
      dtAdd(e){
            let goodsId = e.target.dataset.goodsid;
            let typeId = e.target.dataset.typeid;

            let newArr = [];// 接受type匹配回来的商品数据
            this.data.detailDataList.forEach(item => {
                  if (item.type == typeId){
                        // console.log(item.foods)
                        newArr.push(...item.foods);
                  }
            })
            // 
            newArr.forEach((val,i) => {
                  

                  if (i == goodsId){
                        var arr = [];
                        // console.log(val)
                        // 检验是否存在点击相同的商品
                        var index = this.data.shopcartList.findIndex(v => (v.id == val.id))// 如果有index
                        // console.log(index)
                        if(index != -1){
                              // 不为-1--存在商品了--通过index让所在的对象count +1
                              this.data.shopcartList[index].count += 1;

                              this.setData({
                                    shopcartList: this.data.shopcartList
                              })
                        }else{
                              // 否则push到购物车
                              arr.push(val)
                              this.data.shopcartList.push(...arr)
                              this.setData({
                                    shopcartList: this.data.shopcartList
                              })
                            
                              
                        }
                       
                  }
            })
            // console.log(this.data.shopcartList)
            //计算金钱
            this.setToalPrice();
      },
      // 购物车ADD
      scAdd(e){
            // console.log(e.target.dataset.scid)
            var scId = e.target.dataset.scid;
            this.data.shopcartList.filter((val,i) => {
                  if(scId == i){
                        // 传来的id匹配到购物车数据的话，将购物车数据里的count+1
                        return val.count+=1
                  }
            })
            this.setData({
                  shopcartList: this.data.shopcartList
            })

            //计算金钱和件数
            this.setToalPrice();
            
      },
      // 购物车reduce
      scReduce(e) {
            // console.log(e.target.dataset.scid)
            var scId = e.target.dataset.scid;

            this.data.shopcartList.filter((val, i) => {
                  if (scId == i) {
                        // 传来的id匹配到购物车数据的话，将购物车数据里的count+1
                        return val.count -= 1
                       
                  }
            })
            // 如果为0的话，删除掉商品
            if (this.data.shopcartList[scId].count == 0) {
                  this.data.shopcartList.splice(scId, 1);
            }

            this.setData({
                  shopcartList: this.data.shopcartList
            })

            //计算金钱和件数
            this.setToalPrice();
            
           
      },
      
      // 计算总金额
      setToalPrice(){
            this.data.totalPrice = 0;
            this.data.totalCount = 0;
            this.data.remainPrice = 0;
            this.data.shopcartList.forEach(val => {
                  this.data.totalPrice += val.count * val.price
                  this.data.totalCount += val.count
            })
            this.setData({
                  totalPrice: this.data.totalPrice,
                  totalCount: this.data.totalCount
            })
            // 是否到达规定的价格
            if (this.data.totalPrice >= this.data.rulePrice){
                  this.setData({
                        isRulePriceFlag:true
                  })
            }else{
                  this.setData({
                        isRulePriceFlag: false
                  })
            }
            // 计算还差多少钱
            this.data.remainPrice = 0
            if (this.data.isRulePriceFlag == false) {
                  // 差价=规定价格-总价
                  this.data.remainPrice = this.data.rulePrice - this.data.totalPrice
                  this.setData({
                        remainPrice: this.data.remainPrice
                  })
            }
            
      },
      // 
      // 去支付页面--pay
      toPay(){
            let _this = this;
              // 设置购物车本地数据--给支付订单页使用数据
            wx.setStorageSync('shopcart', this.data.shopcartList)

            wx.navigateTo({
                  // 带个总价格
                  url: '../pay/pay?totalPrice=' + _this.data.totalPrice + '&totalCount=' + _this.data.totalCount +'',
            })
      },
      // 清空购物车
      delAll(){
            // 
            this.setData({
                  shopcartList:[],
                  showShopCart:false
            })
            //计算金钱和件数
            this.setToalPrice();
      },
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (e) {
            var _this = this;
            wx.request({
                  url: 'http://127.0.0.1:10000/details',
                  method: 'get',
                  success: function (res) {
                        _this.setData({
                              detailDataList:res.data
                        })
                        // console.log(_this.data.detailDataList)
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