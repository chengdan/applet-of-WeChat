Page({
    data:{
        userName:"",//用户名字
        userPic:"",//用户头像
        myGrade:'', //自己的总分
        myGr:"", //另外一人的总分
        victory:"",  //胜利或者失败
        win:"", //胜利或者失败
        user_id:'',//用户id
        name:"", //好友名称
        pic:"", //好友头像
        match_id:"",
        nav:["他们都来了，你呢？","你敢来智商比试么，谁输就真心话大冒险","智慧担当在此，你能超过我吗？","点识成金，答题赢奖，点击进入，和我一起..."]
    },
    onLoad: function (options) {
        this.setData({
           myGrade:options.myGrade,
           user_id:options.user_id,
           myGr:options.myGr,
           name:options.name,
           pic:options.pic,
           match_id:options.match_id
       });
        wx.setNavigationBarTitle({
            title: '对战结果'
        });

        let that = this;
        //关闭房间
        wx.request({
            url: "https://dati.51laiding.com/?r=friend/close",
            data: {
                match_id:that.data.match_id
            },
            method: "GET",
            success:function (res) {
                console.log(res.data);
            }
        });


        //判断谁胜谁败
        let nav = ["胜","败"];
        if(+this.data.myGrade > +this.data.myGr){
            this.setData({
                victory:nav[0],
                win:nav[1]
            })
        }else {
            this.setData({
                victory:nav[1],
                win:nav[0]
            })
        }

        //获取用户的头像与名字
        wx.getUserInfo({
            success: function(res) {
                let userInfo = res.userInfo;
                let nickName = userInfo.nickName ; //用户名
                let avatarUrl = userInfo.avatarUrl;  //头像链接
                that.setData({
                    userName: nickName,
                    userPic:avatarUrl
                })
            }
        });
    },
    getClose:function () {
        wx.redirectTo({
            url:'../index/index'
        })
    },
    getAgain:function () {
        wx.redirectTo({
            url: '../friend/friend?user_id='+this.data.user_id
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