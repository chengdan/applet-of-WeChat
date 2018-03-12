Page({
    data: {
        userName: "",//用户名字
        userPic: "", //用户头像
        nav: ["他们都来了，你呢？", "你敢来智商比试么，谁输就真心话大冒险", "智慧担当在此，你能超过我吗？", "点识成金，答题赢奖，点击进入，和我一起..."],
        user_id: '', //用户id
        items: '', //拿到的题目
        match_id: '', //房间id
        name: "...",//等待好友进入时显示的名字
        pic: "http://47.97.185.141/xcx-images/dengdai.png",//等待好友进入时显示的头像
        code: "",//好友code码
        yId:""//用户id
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '好友对战'
        });
        this.setData({
            user_id: options.user_id,
        });

        let that = this;
        //判断是否创建房间
        if (options.match_id) {
            this.setData({
                match_id: options.match_id
            });
        } else {
            wx.request({
                url: "https://dati.51laiding.com/?r=friend/join",
                data: {
                    user_id: that.data.user_id
                },
                method: "GET",
                success: function (res) {
                    that.setData({
                        match_id: res.data
                    });
                }
            });
        }


        //获取用户的头像与名字
        wx.login({
            success: function (e) {
                wx.getUserInfo({
                    success: function (res) {
                        let userInfo = res.userInfo;
                        let nickName = userInfo.nickName;  //用户名
                        let avatarUrl = userInfo.avatarUrl;  //头像链接
                        that.setData({
                            userName: nickName,
                            userPic: avatarUrl,
                            code: e.code,
                        });

                        let timer;
                        timer = setInterval(function () {
                            wx.request({
                                url: "https://dati.51laiding.com/?r=friend/build",
                                data: {
                                    user_id: that.data.user_id || "",
                                    nickName: that.data.userName,
                                    avatarUrl: that.data.userPic,
                                    code: that.data.code,
                                    match_id: that.data.match_id
                                },
                                method: "GET",
                                success: function (res) {
                                    that.setData({
                                        name: res.data.user_name,
                                        pic: res.data.user_photo,
                                        yId:res.data.user_id
                                    });

                                    //获取到好友信息后跳转页面
                                    if (res.data != "") {
                                        clearInterval(timer);
                                        wx.navigateTo({
                                            url: '../answer/answer?name=' + that.data.name + "&pic=" + that.data.pic + "&user_id=" + that.data.user_id + "&match_id=" + that.data.match_id + "&yId=" + that.data.yId
                                        });
                                    }
                                }
                            });
                        }, 2000);
                    }
                });
            }
        });
    },
    goodBey: function () {
        wx.redirectTo({
            url: '../index/index'
        })
    },
    onShareAppMessage: function (res) {
        let num = Math.round(Math.random(0, 1) * 3);
        return {
            title: this.data.nav[num],
            path: "/pages/friend/friend?match_id=" + this.data.match_id,
        };
    }
});