Page({
    data:{
      list:"",
      user_id:"",
      total_money:""
    },
    onLoad: function (options) {
        // 获取用户id
        this.setData({
            user_id:options.user_id,
            total_money:options.total_money
        });

        wx.setNavigationBarTitle({
            title: '积分商城'
        });
        let that = this;
        wx.request({
            url:"https://dati.51laiding.com/?r=goods",
            method:"GET",
            success:function (res) {
                that.setData({
                    list:res.data
                });
            }
        });
    },
    //点击兑换
    getInfo:function (e) {
        if(this.data.total_money > e.target.dataset.prize){
            wx.navigateTo({
                url:'../info/info?goods_id='+e.currentTarget.id+"&user_id="+this.data.user_id+"&prize="+e.target.dataset.prize
            })
        }else {
            wx.showToast({
                title:"您的智币不足",
                duration:2000
            })
        }

    },
    //我所兑换的商品
    getRecord:function () {
        wx.navigateTo({
            url:'../storeRecord/storeRecord?user_id='+this.data.user_id
        })
    }
});