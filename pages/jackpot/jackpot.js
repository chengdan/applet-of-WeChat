const app = getApp();

Page({
    data: {
        hidden:false,
        nav:["他们都来了，你呢？","你敢来智商比试么，谁输就真心话大冒险","智慧担当在此，你能超过我吗？","点识成金，答题赢奖，点击进入，和我一起..."],
        user_id:"",
        user_money:""
    },
    onLoad: function (options) {
        // 获取用户id
        this.setData({
            user_id:options.user_id,
            user_money:options.user_money
        });


        wx.setNavigationBarTitle({
            title: '奖池赛'
        });


    },
    toGame:function () {
        if(this.data.user_money >= 200){
            //一开始进入页面获取用户id
            wx.navigateTo({
                url: '../prize/prize?user_id='+this.data.user_id
            })
        }else {
            wx.showToast({
                title:"您的金币不足",
                duration: 2000
            })
        }

    },

    modalHide:function () {
        this.setData({
            hidden:true
        })
    },

    onShareAppMessage: function (res) {
        let num = Math.round(Math.random(0,1)*3);
        return{
            title:this.data.nav[num],
            path:"/pages/index/index"
        }
    }
});
