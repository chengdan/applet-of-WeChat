Page({
    data:{
      nav:["更多意想不到【礼品】，尽在点识成金！","重磅消息！一筐金币，一箱金币，一车金币，带回家~","哇！我的知识竟然能换到大礼品","点识成金，答题赢奖，点击进入，和我一起..."]
    },
    onShareAppMessage: function (res) {
        let num = Math.round(Math.random(0,1)*3);
        return{
            title:this.data.nav[num],
            path:"/pages/index/index"
        }
    },
    getClose:function () {
        wx.navigateTo({
            url:'../index/index'
        })
    }
})