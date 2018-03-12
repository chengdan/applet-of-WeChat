Page({
    data:{
        infoList:"",
        count:""
    },
    onLoad: function (options) {

        wx.setNavigationBarTitle({
            title: '我的兑换'
        });

        let that = this;
        wx.request({
            url: "https://dati.51laiding.com/?r=goods/order",
            data: {
                user_id:options.user_id
            },
            method: "GET",
            success: function (res) {
                that.setData({
                    infoList:res.data
                })
            }
        });
    },
    getUser:function (e) {
        let id = e.currentTarget.dataset.id;
        this.setData({
            count:id
        })
    }
});