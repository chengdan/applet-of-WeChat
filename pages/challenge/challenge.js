//index.js
//获取应用实例
Page({
    data:{
        userName:"",//用户名字
        userPic:"", //用户头像
        nav:["他们都来了，你呢？","你敢来智商比试么，谁输就真心话大冒险","智慧担当在此，你能超过我吗？","点识成金，答题赢奖，点击进入，和我一起..."]
    },
    onLoad:function () {
        wx.setNavigationBarTitle({
            title: '挑战赛'
        });

        //获取用户的头像与名字
        let that = this;
        wx.getUserInfo({
            success: function(res) {
                var userInfo = res.userInfo
                var nickName = userInfo.nickName  //用户名
                var avatarUrl = userInfo.avatarUrl  //头像链接
                that.setData({
                    userName: nickName,
                    userPic:avatarUrl
                })
            }
        });

        setTimeout(function () {
            wx.navigateTo({
                url:'../answer/answer'
            })
        },1000)
    },
    onShareAppMessage: function (res) {
        let num = Math.round(Math.random(0,1)*3);
        return{
            title:this.data.nav[num],
            path:"/pages/index/index"
        }
    }
});