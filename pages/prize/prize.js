const app = getApp();


let timer;
Page({
    data: {
        userName:"",//用户名
        userPic:"", //头像链接
        items: "",  //题目数据
        subject: "",
        errorIcon: false,
        result: true, /*结果*/
        answer: true, /*全部选项*/
        choose: "", /*选择项*/
        right: "", /*正确选项*/
        count: '',
        bg: 'error', /*背景颜色*/
        falg: true, /*节流阀*/
        record: "", /*遍历题目*/
        number: 0, /*题目*/
        titleShow: false,
        title: "第一题",
        hours: '00',
        minutes: '00',
        seconds: "00",
        success: true,
        defeated: true,
        user_id:'',
        match_id:"",
        error:"",//正确或失败的控制
        ranking:"",//全答对时名次
        prize:"",//用户所省余的金额
        navT:["无敌是多么寂寞，轻轻松松拿金币，你敢来挑战我么？","搏一搏，单车变摩托，摩托变汽车~","点识成金，答题赢奖，点击进入，和我一起..."],//成功时分享的内容
        navF:["哎呀，宝宝输了，求求你帮我赢金币，给你一个","我都金币都去哪了，还给我...","点识成金，答题赢奖，点击进入，和我一起..."],//失败时分享的内容
    },
    onLoad: function (options) {
        this.setData({
            user_id:options.user_id,
        });

        let that = this;
        wx.request({
            url:"https://dati.51laiding.com/?r=rank/start",
            method:"GET",
            data:{
                user_id:that.data.user_id
            },
            success:function (res) {
                that.setData({
                   items:res.data.问题,
                   match_id:res.data.奖池ID
                });
                that.setData({
                    subject: that.data.items[that.data.number][0].content,
                    record: that.data.items[that.data.number][1]
                });
            }
        });

        //获取用户实时金额
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
                        that.setData({
                            prize:res.data.用户金币
                        })
                    }
                });
            }
        });


        // 获取用户信息
        wx.getUserInfo({
            success: function(res) {
                let userInfo = res.userInfo;
                let nickName = userInfo.nickName; //用户名
                let avatarUrl = userInfo.avatarUrl;  //头像链接
                that.setData({
                    userName: nickName,
                    userPic:avatarUrl
                })
            }
        });

        wx.setNavigationBarTitle({
            title: '奖池赛'
        });
        // 初始渲染题目
        let second = 0;
        let minute = 0;
        let hour = 0;

        setTimeout(_ => {
            this.setData({
                answer: false,
                titleShow: true
            });
            // 计时
            timer = setInterval(_ => {
                second = +second + 1;
                second = second > 9 ? second : '0' + second;
                this.setData({
                    seconds: second
                });

                if (second > 99) {
                    second = '00';
                    this.setData({
                        seconds: second
                    });
                    minute = +minute + 1;
                    minute = minute > 9 ? minute : '0' + minute;
                    this.setData({
                        minutes: minute
                    });
                }
                if (minute > 59) {
                    minute = "00";
                    this.setData({
                        minutes: minute
                    });

                    hour = +hour + 1;
                    hour = hour > 9 ? hour : '0' + hour;
                    this.setData({
                        hours: hour
                    });
                }
                if (this.data.success === false || this.data.defeated === false) {
                    clearInterval(timer)
                }
            }, 10);
        }, 1000);

    },
    // 答题
    affirm: function (e) {
        let that = this;

        if (this.data.falg) {
            // 节流阀
            this.setData({
                falg: false
            });

            let id = e.currentTarget.dataset.id;
            this.setData({
                count: id
            });
            for (let i = 0; i < this.data.record.length; i++) {
                if (this.data.record[i].name === 'shh') {
                    this.setData({
                        right: this.data.record[i].value,
                    });

                    if (this.data.count === i) {
                        this.setData({
                            bg: 'correct'
                        })
                    }
                    if (this.data.count !== i) {
                        this.setData({
                            bg: 'error'
                        });
                        this.setData({
                            error:this.data.bg
                        })
                    }
                }
            }

            setTimeout(_ => {
                this.setData({
                    result: false,
                    answer: true,
                    choose: this.data.record[id].value
                });
                if (this.data.choose === this.data.right) {
                    this.setData({
                        errorIcon: true
                    })
                }
                if (this.data.number < that.data.items.length-1) {
                    // 新一题开始
                    setTimeout(_ => {
                        this.setData({
                            number: this.data.number + 1,
                            result: true,
                            titleShow: false,
                            errorIcon: false
                        });
                        // 题号对应的中文
                        switch (this.data.number) {
                            case 1:
                                this.setData({
                                    title: "第二题",
                                });
                                break;
                            case 2:
                                this.setData({
                                    title: "第三题",
                                });
                                break;
                            case 3:
                                this.setData({
                                    title: "第四题",
                                });
                                break;
                            case 4:
                                this.setData({
                                    title: "第五题",
                                });
                                break;
                            case 5:
                                this.setData({
                                    title: "第六题",
                                });
                                break;
                            case 6:
                                this.setData({
                                    title: "第七题",
                                });
                                break;
                            case 7:
                                this.setData({
                                    title: "第八题",
                                });
                                break;
                            case 8:
                                this.setData({
                                    title: "第九题",
                                });
                                break;
                            case 9:
                                this.setData({
                                    title: "最后一题",
                                });
                                break;
                        }
                        // 题号对应的中文
                        this.setData({
                            subject: this.data.items[this.data.number][0].content,
                            record: this.data.items[this.data.number][1],
                            bg: '',
                            falg: true
                        });
                        // 题目出现
                        setTimeout(_ => {
                            this.setData({
                                answer: false,
                                titleShow: true
                            });
                        }, 1000)

                    }, 2000);
                } else {
                    setTimeout(_=>{
                        if (this.data.error === 'error') {
                            //失败时
                            this.setData({
                                defeated: false
                            });

                        } else {
                            //成功时
                            this.setData({
                                success: false
                            });
                            wx.request({
                                url: "https://dati.51laiding.com/?r=rank/end",
                                data: {
                                    user_id:that.data.user_id,
                                    use_time: that.data.hours + that.data.minutes + that.data.seconds,
                                    match_id:that.data.match_id
                                },
                                method: "GET",
                                success: function (res) {
                                    that.setData({
                                        ranking:res.data
                                    })
                                }
                            });
                        }
                    },1000)

                }
            }, 1000)
        }
    },

    again:function () {
        if(this.data.prize >= 200){
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
    close:function () {
        wx.navigateTo({
            url: '../index/index'
        })
    },
    onShareAppMessage: function (res) {
        let num = Math.round(Math.random(0,1)*2);
        if (this.data.error === 'error'){
            return{
                title:this.data.navF[num],
                path:"/pages/index/index"
            }
        }else {
            return{
                title:this.data.navT[num],
                path:"/pages/index/index"
            }
        }
    }
});



