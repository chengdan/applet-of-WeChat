let id;


Page({
    data: {
        items: '',
        subject: "", //题目
        errorIcon: true, //点击后是否显示
        result: true, /*结果*/
        answer: true, //问题
        answers: true, //问题
        choose: "", /*回答问题所选项*/
        right: "", /*正确选项*/
        count: '', //用来记录当然元素的id
        bg: 'error', /*背景颜色*/
        falg: true, /*节流阀*/
        record: "", /*遍历题目*/
        number: 0,
        hint: false,//提示
        title: "第一题",
        time: 10,
        timer: "",
        userName: "",//用户名字
        userPic: "", //用户头像
        myWidth: 0,//进度条
        myGrade: 0,//分数
        click: 0,//点击
        user_id: '', //用户id
        name: "",//好友名称
        pic: '',//好友头像
        match_id: '',//房间id
        yId: '',//好友id
        myGr: 0,//好友分数
        yWidth: 0,//好友进度条,
    },
    onLoad: function (options) {
        console.log(options);
        wx.setNavigationBarTitle({
            title: '对战题目',
        });

        this.setData({
            user_id: options.user_id,
            name: options.name,
            pic: options.pic,
            match_id: options.match_id,
            yId: options.yId
        });
        //获取用户的头像与名字/
        let that = this;
        wx.login({
            success: function (e) {
                wx.getUserInfo({
                    success: function (res) {
                        let userInfo = res.userInfo;
                        let nickName = userInfo.nickName;  //用户名
                        let avatarUrl = userInfo.avatarUrl;  //头像链接
                        that.setData({
                            userName: nickName,
                            userPic: avatarUrl
                        })
                    }
                });
            }
        });

        wx.request({
            url: "https://dati.51laiding.com/?r=friend/start",
            data: {
                match_id: that.data.match_id
            },
            method: "GET",
            success: function (res) {
                that.setData({
                    items: res.data
                });
                // 初始渲染题目
                that.setData({
                    subject: that.data.items[that.data.number][0].content,
                    record: that.data.items[that.data.number][1]
                });
            }
        });

        // 倒计时功能
        setTimeout(_ => {
            this.setData({
                hint: true,
                answer: false,
                answers: false
            });
        }, 1000);

        if (that.data.time === 10) {
            that.setData({
                tim: setInterval(function () {
                        that.setData({
                            time: that.data.time - 1
                        });

                        //当用户没有点击发送请求倒计时结束自动发送请求
                        if (that.data.time === 0) {
                            console.log("我被触发了");
                            that.setData({
                                number: that.data.number + 1,
                                time: "",
                                answers: true
                            });

                            // 发送请求
                            wx.request({
                                url: "https://dati.51laiding.com/?r=friend/go",
                                data: {
                                    user_id: that.data.user_id,
                                    yId: that.data.yId,
                                    myGrade: that.data.myGrade
                                },
                                method: "GET"
                            });
                        }
                    }
                    ,
                    1000
                )
            })
        }
    },

    onShow: function () {
        let that = this;
        let timer;
        // 拿到信息
        timer = setInterval(function () {
            wx.request({
                url: "https://dati.51laiding.com/?r=friend/come",
                method: "GET",
                data:{
                  match_id:that.data.match_id
                },
                success: function (res) {
                    if (res.data !== "") {
                        console.log(res.data);
                        console.log(that.data.number + "----");
                        //渲染个人的成绩与进度条
                        console.log(res.data);
                        if (that.data.user_id === res.data[0].user_id) {
                            that.setData({
                                myGr: res.data[1].grade,
                                yWidth: res.data[1].grade * 0.52
                            });
                        }
                        else if (that.data.yId === res.data[0].user_id) {
                            that.setData({
                                myGr: res.data[1].grade,
                                yWidth: res.data[1].grade * 0.52
                            });
                        }
                        else {
                            that.setData({
                                myGr: res.data[0].grade,
                                yWidth: res.data[0].grade * 0.52
                            });
                        }
                        //到下一题
                        if (that.data.number <= that.data.items.length - 1) {
                            //清空数据
                            wx.request({
                                url: "https://dati.51laiding.com/?r=friend/delete",
                                method: "GET",
                            });
                            console.log("我走了");

                            setTimeout(_ => {
                                that.setData({
                                    result: true,
                                    hint: false,
                                    errorIcon: false,
                                });
                                id = ""; //每次到下一题让id为空
                                switch (that.data.number) {
                                    case 1:
                                        that.setData({
                                            title: "第二题",
                                        });
                                        break;
                                    case 2:
                                        that.setData({
                                            title: "第三题",
                                        });
                                        break;
                                    case 3:
                                        that.setData({
                                            title: "第四题",
                                        });
                                        break;
                                    case 4:
                                        that.setData({
                                            title: "最后一题",
                                        });
                                        break;
                                    case 5:
                                }
                                that.setData({
                                    subject: that.data.items[that.data.number][0].content,
                                    record: that.data.items[that.data.number][1],
                                    bg: '',
                                    falg: true
                                });
                                // 题目出现
                                setTimeout(_ => {
                                    that.setData({
                                        answer: false,
                                        answers: false,
                                        hint: true
                                    });

                                    //重新开始倒计时
                                    that.setData({
                                        time: 10
                                    });
                                    // 点击后自动
                                    // that.setData({
                                    //     timer: setInterval(_ => {
                                    //         that.setData({
                                    //             time: that.data.time - 1
                                    //         });
                                    //         // 当时间为0时
                                    //         if (that.data.time === 0) {
                                    //
                                    //             that.setData({
                                    //                 answer: true,
                                    //                 errorIcon: true,
                                    //             });
                                    //             for (let i = 0; i < that.data.record.length; i++) {
                                    //                 if (that.data.record[i].name === 'shh') {
                                    //                     that.setData({
                                    //                         result: false,
                                    //                         right: that.data.record[i].value,
                                    //                         time: 10,
                                    //                         number: that.data.number + 1,
                                    //                     });
                                    //                     if (that.data.number > that.data.items.length - 1) {
                                    //                         clearInterval(that.data.timer);
                                    //                         wx.redirectTo({
                                    //                             url: '../answerResult/answerResult?myGrade=' + that.data.myGrade + "&user_id=" + that.data.user_id + "&myGr=" + that.data.myGr + "&name=" + that.data.name + "&pic=" + that.data.pic
                                    //                         });
                                    //                         return;
                                    //                     }
                                    //                     // 题号
                                    //                     switch (that.data.number) {
                                    //                         case 1:
                                    //                             that.setData({
                                    //                                 title: "第二题",
                                    //                             });
                                    //                             break;
                                    //                         case 2:
                                    //                             that.setData({
                                    //                                 title: "第三题",
                                    //                             });
                                    //                             break;
                                    //                         case 3:
                                    //                             that.setData({
                                    //                                 title: "第四题",
                                    //                             });
                                    //                             break;
                                    //                         case 4:
                                    //                             that.setData({
                                    //                                 title: "第五题",
                                    //                             });
                                    //                             break;
                                    //                         case 5:
                                    //                             that.setData({
                                    //                                 title: "第六题",
                                    //                             });
                                    //                             break;
                                    //                         case 6:
                                    //                             that.setData({
                                    //                                 title: "第七题",
                                    //                             });
                                    //                             break;
                                    //                         case 7:
                                    //                             that.setData({
                                    //                                 title: "第八题",
                                    //                             });
                                    //                             break;
                                    //                         case 8:
                                    //                             that.setData({
                                    //                                 title: "第九题",
                                    //                             });
                                    //                             break;
                                    //                         case 9:
                                    //                             that.setData({
                                    //                                 title: "第十题",
                                    //                             });
                                    //                             break;
                                    //                     }
                                    //                     // 第二题开始
                                    //                     setTimeout(_ => {
                                    //                         that.setData({
                                    //                             time: 10,
                                    //                             result: true,
                                    //                             hint: false
                                    //                         });
                                    //                         // 提示消失，题目出来
                                    //                         setTimeout(_ => {
                                    //                             that.setData({
                                    //                                 time: 10,
                                    //                                 hint: true,
                                    //                                 answer: false,
                                    //                                 subject: that.data.items[that.data.number][0].content,
                                    //                                 record: that.data.items[that.data.number][1]
                                    //                             });
                                    //                         }, 900);
                                    //                     }, 900)
                                    //                 }
                                    //             }
                                    //         }
                                    //     }, 1000)
                                    // });
                                }, 1000);
                            }, 2000);
                        }

                        if (that.data.number === 5) {
                            that.setData({
                                number: 0,
                                hint: true,
                                title: ""
                            });
                            setTimeout(function () {
                                console.log("我被跳转了");
                                wx.navigateTo({
                                    url: '../answerResult/answerResult?myGrade=' + that.data.myGrade + "&user_id=" + that.data.user_id + "&myGr=" + that.data.myGr + "&name=" + that.data.name + "&pic=" + that.data.pic + "&match_id=" + that.data.match_id
                                });
                            }, 2500)
                        }
                    }
                }
            });
        }, 200)
    },

    // 答题
    affirm: function (e) {
        let that = this;
        if (this.data.falg) {
            //点击后停止倒计时
            clearInterval(this.data.timer);

            if (that.data.time > 0) {
                // clearInterval(that.data.tim);
                that.setData({
                    number: that.data.number + 1,
                })
            } else {
                that.setData({
                    number: that.data.number
                })
            }

            this.setData({
                falg: false,
                click: this.data.click++,
                answers: true
            });

            id = e.currentTarget.dataset.id;
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
                            bg: 'correct',
                            myGrade: +this.data.myGrade + (this.data.time / 10) * 100
                        });
                        this.setData({
                            myWidth: this.data.myGrade * 0.52,
                        })
                    }
                    if (this.data.count !== i) {
                        this.setData({
                            bg: 'error'
                        })
                    }
                }
            }

            that.setData({
                time: ""
            });

            setTimeout(function () {
                that.setData({
                    result: false,
                    answer: true,
                    choose: that.data.record[id].value
                });
                if (that.data.choose === that.data.right) {
                    that.setData({
                        errorIcon: true
                    })
                } else {
                    that.setData({
                        errorIcon: false
                    })
                }
            }, 1000);


            //发送请求
            wx.request({
                url: "https://dati.51laiding.com/?r=friend/go",
                data: {
                    user_id: that.data.user_id,
                    yId: that.data.yId,
                    myGrade: that.data.myGrade
                },
                method: "GET"
            });

        }
    },
});
