//index.js
//获取应用实例
const app = getApp()

Page({
      data: {
            categoryList: [
                  {
                        imgs: "../image/aa01.webp",
                        name: "美食"
                  },
                  {
                        imgs: "../image/aa02.webp",
                        name: "晚餐"
                  },
                  {
                        imgs: "../image/aa03.webp",
                        name: "商超便利"
                  },
                  {
                        imgs: "../image/aa04.webp",
                        name: "水果"
                  },
                  {
                        imgs: "../image/aa05.webp",
                        name: "医药健康"
                  },
                  {
                        imgs: "../image/aa06.webp",
                        name: "浪漫鲜花"
                  },
                  {
                        imgs: "../image/aa07.webp",
                        name: "汉堡披萨"
                  },
                  {
                        imgs: "../image/aa08.webp",
                        name: "厨房生鲜"
                  },
                  {
                        imgs: "../image/aa09.webp",
                        name: "甜品饮品"
                  },
                  {
                        imgs: "../image/aa10.webp",
                        name: "素食简餐"
                  },
                 
            ],
            categoryListSencond:[
                  {
                        imgs: "../image/aa01.webp",
                        name: "美食"
                  },
                  {
                        imgs: "../image/aa02.webp",
                        name: "晚餐"
                  },
            ],
            bannerList:['../image/banner01.webp', '../image/banner02.webp','../image/banner03.webp', '../image/banner04.webp'],
            category: ["综合排序", '距离最近', '品质联盟','筛选'],
            selected: true,
            selected1:false,
            selected2:false,
            selected3:false,
            sjDataList:[],


            // 懒加载参数
            start:0,
            end:2,// 初始化2条数据
            dataCount:2,
            noHasLazyData:false,// 没有懒加载数据了--提示没有更多数据
            isLoading:false,//进行懒加载中--提示

      },
      // 分类点击
      category:function(event){
            console.log(event.target.dataset.index)
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
      selected3() {
            this.setData({
                  selected: false,
                  selected1: false,
                  selected2: false,
                  selected3: true,
            })
      },
      // 懒加载数据
      lazyLoadData(){
            // 如果没有数据--不往下执行
            if (this.data.noHasLazyData == true){
                  return
            }
            // 显示正在加载中
            this.setData({
                  isLoading:true
            })
            // 设置定时器，3s才请求到数剧--并设置正在加载中为false
            setTimeout(()=>{
                  // 请求数据api
                  let _this = this;
                  
                  if (_this.data.noHasLazyData == true) {
                        console.log("没有更多商家了")
                        return// 不执行了
                  } else {
                        // 没有懒加载数据为假
                        let isOK = false;// 防止用户一直往下滑--请求到数据才设置true
                        if(!isOK){
                              isOK = true;
                              wx.request({
                                    url: 'http://127.0.0.1:10000/',
                                    method: 'get',
                                    success: function (res) {
                                          // console.log(res.data.result)
                                          let start = _this.data.start;
                                          let end = _this.data.end;
                                          let dataCount = _this.data.dataCount;
                                          // 裁剪数据--一个一个push
                                          var sliceData = res.data.result.slice(start, end);
                                          if (sliceData.length == 0) {
                                                // 如果裁剪不到数据的--设置没有懒加载数据为真
                                                _this.setData({
                                                      noHasLazyData: true
                                                })
                                          }
                                          _this.data.sjDataList.push(...sliceData)
                                          // 更新数据
                                          _this.setData({
                                                sjDataList: _this.data.sjDataList,
                                                start: _this.data.end,
                                                end: _this.data.end + dataCount
                                          })
                                          isOK=false;// 请求设置false--否则不会进来
                                    }
                              })
                        }
                       
                  }
                  // 修改isLoading
                  this.setData({
                        isLoading: false
                  })
            },3000)
            
            
      },
      // 跳转到详情页
      toDetails(e){
            // console.log(id)
            wx.navigateTo({
                  url: '../detail/detail',
            })
      },
      onLoad: function() {
            // 懒加载数据
            this.lazyLoadData();
            // 
            if (app.globalData.userInfo) {
                  this.setData({
                        userInfo: app.globalData.userInfo,
                        hasUserInfo: true
                  })
            } else if (this.data.canIUse) {
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  app.userInfoReadyCallback = res => {
                        this.setData({
                              userInfo: res.userInfo,
                              hasUserInfo: true
                        })
                  }
            } else {
                  // 在没有 open-type=getUserInfo 版本的兼容处理
                  wx.getUserInfo({
                        success: res => {
                              app.globalData.userInfo = res.userInfo
                              this.setData({
                                    userInfo: res.userInfo,
                                    hasUserInfo: true
                              })
                        }
                  })
            }
      },
      /**
        * 页面上拉触底事件的处理函数
        */
      onReachBottom: function () {
            // 懒加载数据
            this.lazyLoadData();
      },
})