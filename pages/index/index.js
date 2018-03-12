//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        userName: "",//用户名字
        userPic: "",//用户头像
        msg: "欢迎进入“点识成金丨答题”快快发挥你的才智，进入答题吧! ", //公告里第一行字
        msgT:"“迎新春，点识成金”", //公告里第二行字
        timer: 0,
        money: "",//用户金币
        wisdom: '',     //智豪榜
        rank:'',//奖池赛排名
        user_id:'', //用户id
        OPEN_ID:"",
        image:""
    },
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '首页'
        });

        //让公告里的字动起来
        this.setData({
            timer: setInterval(_ => {
                this.setData({
                    msg: this.data.msg.slice(1) + this.data.msg.slice(0, 1),
                })
            }, 500)
        });
        // 获取用户信息
        let that = this;
        wx.getUserInfo({
            success: function (res) {
                let userInfo = res.userInfo;
                let nickName = userInfo.nickName;    //用户名
                let avatarUrl = userInfo.avatarUrl;   //头像链接
                that.setData({
                    userName: nickName,
                    userPic: avatarUrl
                });

                wx.login({
                    success: function (e) {
                        wx.request({
                            url: "https://dati.51laiding.com/?r=index/index",
                            data: {
                                username: that.data.userName,
                                photo: that.data.userPic,
                                code: e.code,
                            },
                            method: "GET",
                            success: function (res) {
                                if(res.data.领奖状态 === "1"){
                                    that.setData({
                                        image:"http://47.97.185.141/xcx-images/lingjiang_@3x.png"
                                    })
                                }else {
                                    that.setData({
                                        image:"http://47.97.185.141/xcx-images/lingjiangchenggong.png"
                                    })
                                }
                                that.setData({
                                    money: res.data.用户金币,
                                    wisdom: res.data.智豪榜,
                                    rank:res.data.奖池排名,
                                    user_id:res.data.用户ID,
                                    OPEN_ID:res.data.OPEN_ID
                                })
                            }
                        });
                    }
                });
            }
        });
    },
    prize:function () {
        let that = this;
        wx.request({
            url: "https://dati.51laiding.com/?r=index/award",
            data: {
                user_id:that.data.user_id
            },
            method: "GET",
            success: function (res) {
                that.setData({
                    image:"http://47.97.185.141/xcx-images/lingjiangchenggong.png"
                });
            }
        });
    },

    getChallenge: function () {
        // wx.navigateTo({
        //     url: '../challenge/challenge?user_id='+this.data.user_id
        // })
        wx.showToast({
            title:"暂无开放，敬请期待",
            duration:2000,
            icon:"none"
        });
    },
    getRecharge: function () {
        wx.navigateTo({
            url: '../recharge/recharge?user_id='+this.data.user_id+"&OPEN_ID="+this.data.OPEN_ID
        })
    },
    getFriend: function () {
        wx.navigateTo({
            url: '../friend/friend?user_id='+this.data.user_id
        })
        //微信自带的模态框，告诉用户充值成功
        // wx.showToast({
        //     title:"暂无开放，敬请期待",
        //     duration:2000,
        //     icon:"none"
        // });
    },
    // getStore: function () {
    //     // wx.navigateTo({
    //     //     // url: '../store/store?user_id='+this.data.user_id+"&total_money="+this.data.money
    //     // })
    // },
    getJackpot: function () {
        wx.navigateTo({
            url: '../jackpot/jackpot?user_id='+this.data.user_id+"&user_money="+this.data.money
        })
    }
});
