const app = getApp()

Page({
    data: {
        time: 5,
        userName: "",//用户名
        userPic: "" ,//头像链接
        user_id:''
    },
    onLoad:function (options) {
        this.setData({
            user_id:options.user_id
        })
    },

    onShow: function () {
        // 获取用户信息
        let that = this;
        wx.getUserInfo({
            success: function (res) {
                let userInfo = res.userInfo;
                let nickName = userInfo.nickName; //用户名
                let avatarUrl = userInfo.avatarUrl;  //头像链接
                that.setData({
                    userName: nickName,
                    userPic: avatarUrl
                })
            }
        });

        wx.setNavigationBarTitle({
            title: '答题'
        });

        let num = 0;
        let context = wx.createContext();
        let timer = setInterval(_ => {
            context.setLineWidth(6);
            num = num + 0.004;
            context.setStrokeStyle("#DB0EE2");
            context.beginPath();
            context.arc(36, 36, 32, -2 * Math.PI, num * Math.PI, true);
            context.stroke();
            wx.drawCanvas({
                canvasId: 'wxCanvasTest1',
                actions: context.getActions()
            });
            context.setLineWidth(6);
            if (num > 2) {
                clearInterval(timer);
                this.setData({
                    time: 0
                });
                context.beginPath();
                context.arc(36, 36, 32, 0, 0, false);
                context.stroke();
                wx.drawCanvas({
                    canvasId: 'wxCanvasTest1',
                    actions: context.getActions()
                });
            }
        }, 9);
        let time = setInterval(_ => {
            this.setData({
                time: this.data.time - 1
            });
            if (this.data.time <=1) {
                clearInterval(time);
            }
        }, 999);
        setTimeout(_ => {
            wx.navigateTo({
                url: '../prize/prize?user_id='+this.data.user_id
            });
            setTimeout(_=>{
                this.setData({
                    time: 5
                });
            },5000)
        }, 5000)

    },
    onShareAppMessage: function (res) {
        return{
            title:"发起挑战，你一定会错，不信你试试",
            path:"/pages/index/index"
        }
    }

});
