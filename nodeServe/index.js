const express = require('express');
var mysql = require("mysql");
// 配置mysql

var app = express();

//模板引擎engine配置

app.set('view engine','html');
// 数据api
app.get('/',(req,res) => {
    var connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"admin"
    })
    // 第一 数据库连接 
    connection.connect();
    // 2、数据库操作 query 直接扔数据库操作代码
    connection.query("select * from eleme_sj",function(err,result){
        if(err) throw err
        res.json({"code":200,"msg":"请求成功",result})
        // 3、关闭数据库
        connection.end();
    })
})
// 详情页的数据
app.get("/details",(req,res) => {
    let detailDataList = [
        {
            "name":"热销",
            "intro":"大家喜欢吃，才叫好吃",
            "type":-1,
            "foods":[
                {
                    "id":"1101",
                    "name":"WM鸡腿堡(特价)",
                    "price":6,
                    "url":"https://cube.elemecdn.com/0/a6/11517a276209d36612bb7bc8e67a9jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_140,h_140/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
                    "sellCount":"300",
                    "rating":"96",
                    "count":1
                },
                {
                    "id":"1102",

                    "name":"WM鸡腿堡+鸡肉卷",
                    "price":7,
                    "url":"https://cube.elemecdn.com/4/ba/765be20ae3c0952a6a9a8b818c9f2jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_140,h_140/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
                    "sellCount":"320",
                    "rating":"94",
                    "count":1

                },
                {
                    "id":"1103",

                    "name":"招牌脆皮全鸡餐",
                    "price":22,
                    "url":"https://cube.elemecdn.com/f/20/b7982c25b80acd17a32fb65c73e6cjpeg.jpeg?x-oss-process=image/resize,m_lfit,w_140,h_140/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
                    "sellCount":"600",
                    "rating":"100",
                    "count":1

                },
            ]
        },
        {
            "name":"优惠",
            "intro":"美味又实惠，大家快来买",
            "type":0,
            "foods":[
                {
                    "id":"1104",

                    "name":"WM双人分享餐C",
                    "price":38,
                    "url":"https://cube.elemecdn.com/d/dc/2932ded5040bbc5fd3c40247e217ejpeg.jpeg?x-oss-process=image/resize,m_lfit,w_140,h_140/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
                    "sellCount":"300",
                    "rating":"96",
                    "count":1

                },
                {
                    "id":"1105",

                    "name":"WM超值充电饱套餐A",
                    "price":18,
                    "url":"https://cube.elemecdn.com/2/de/dac5aa1c62e4cb066ef31736e9516jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_140,h_140/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
                    "sellCount":"320",
                    "rating":"94",
                    "count":1

                },
            ]
        },
        {
            "name":"主食",
            "intro":"吃饱才有力气减肥",
            "type":1,
            "foods":[
                {
                    "id":"1106",

                    "name":"香辣鸡腿堡",
                    "price":11,
                    "url":"https://cube.elemecdn.com/7/2f/17d9d94293c47c00e01935bb7a6f9jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_140,h_140/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
                    "sellCount":"100",
                    "rating":"99",
                    "count":1

                },
                {
                    "id":"1107",

                    "name":"板烧堡",
                    "price":12,
                    "url":"https://cube.elemecdn.com/b/5e/f3e49723be52fe9b43850c4330e52jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_140,h_140/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
                    "sellCount":"330",
                    "rating":"95",
                    "count":1

                },
                {
                    "id":"1108",

                    "name":"蜜汁手扒鸡",
                    "price":28,
                    "url":"https://cube.elemecdn.com/9/d5/f82fac79ffaed70e3653901b22e40jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_140,h_140/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
                    "sellCount":"336",
                    "rating":"98",
                    "count":1

                },
            ]
        },
        {
            "name":"配餐小吃",
            "intro":"解馋下午茶",
            "type":2,
            "foods":[
                {
                    "id":"1109",

                    "name":"那么大薯条",
                    "price":7,
                    "url":"https://cube.elemecdn.com/7/6d/d4250d468930895a82a2a5b12b34ejpeg.jpeg?x-oss-process=image/resize,m_lfit,w_140,h_140/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
                    "sellCount":"200",
                    "rating":"85",
                    "count":1

                },
                {
                    "id":"1110",

                    "name":"鸡米花",
                    "price":6,
                    "url":"https://cube.elemecdn.com/a/df/e8363889f17001d2b6146bcb36656jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_140,h_140/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
                    "sellCount":"333",
                    "rating":"95",
                    "count":1

                },
                {
                    "id":"1111",

                    "name":"烤翅",
                    "price":8,
                    "url":"https://cube.elemecdn.com/f/09/89c9e9a071a4680132800217c6d7djpeg.jpeg?x-oss-process=image/resize,m_lfit,w_140,h_140/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
                    "sellCount":"66",
                    "rating":"98",
                    "count":1

                },
            ]
        },
    ]
    res.send(detailDataList)
})






app.listen(10000,'127.0.0.1',() => console.log('成功开启服务器：http://127.0.0.1:10000'))