Page({
    data:{
        hidden:true,
        jinbi:"",
        money:"",
        open_id:"",
        user_id:""
    },
    onLoad: function (options) {
        //获取用户OPEN_ID
        this.setData({
            open_id:options.OPEN_ID,
            user_id:options.user_id
        });

        wx.setNavigationBarTitle({
            title: '充值礼包'
        })
    },
    //点击对应的充值弹出对应的模态框
    getModule:function (e) {
        this.setData({
            hidden: false,
            jinbi:e.target.dataset.jb,
            money:e.target.dataset.money
        });
    },
    //点击关闭充值的模态框
    getClose:function () {
        this.setData({
            hidden: true
        });
    },
    //支付功能
    getShopping:function () {
        let that = this;
        wx.request({
            url:"https://dati.51laiding.com/?r=recharge/zhifu&openid="+that.data.open_id+"&total_fee="+that.data.money,//后台地址
            method:"POST",
            success:function (res) {
                if(res.data){
                    wx.requestPayment({
                        'timeStamp': res.data.timeStamp, //时间戳
                        'nonceStr': res.data.nonceStr, //商户号（随机数，长度为32位以下，字符串）
                        'package': res.data.package, //后台返回的prepay_id
                        'signType': res.data.signType, //写死MD5，现只支持这个
                        'paySign': res.data.sign, //签名
                        'success':function(res){
                            //支付成功时的回调
                            wx.request({
                                url:"https://dati.51laiding.com/?r=recharge/payok",
                                data:{
                                    jinbi:that.data.jinbi,
                                    user_id:that.data.user_id
                                },
                                method:"GET",
                                success:function () {
                                    //充值成功后关闭模态框
                                    that.setData({
                                        hidden:true
                                    });
                                    //微信自带的模态框，告诉用户充值成功
                                    wx.showToast({
                                        title:"充值成功",
                                        duration:2000
                                    });
                                    //充值成功后重定向到首页
                                    setTimeout(function () {
                                        wx.redirectTo({
                                            url:"../index/index"
                                        })
                                    },2000)
                                }
                            });
                        },
                        'fail':function(res){
                            //失败时的回调
                            wx.showToast({
                                title:"您已取消充值",
                                duration:2000
                            })
                        }
                    })
                }
            }
        })
    }
});