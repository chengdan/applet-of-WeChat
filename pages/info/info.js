let tcity = require("../../utils/citys.js");

Page({
    data: {
        provinces: [],
        province: "",
        citys: [],
        city: "",
        countys: [],
        county: '',
        value: [0, 0, 0],
        values: [0, 0, 0],
        condition: false,
        hint:true,
        goods_id:"",
        user_id:"",
        prize:"",
        user:"",
        number:"",
        detailAdd:""
    },
    bindChange: function(e) {
        let val = e.detail.value;
        let t = this.data.values;
        let cityData = this.data.cityData;

        if(val[0] != t[0]){
            const citys = [];
            const countys = [];

            for (let i = 0 ; i < cityData[val[0]].sub.length; i++) {
                citys.push(cityData[val[0]].sub[i].name)
            }
            for (let i = 0 ; i < cityData[val[0]].sub[0].sub.length; i++) {
                countys.push(cityData[val[0]].sub[0].sub[i].name)
            }

            this.setData({
                province: this.data.provinces[val[0]],
                city: cityData[val[0]].sub[0].name,
                citys:citys,
                county: cityData[val[0]].sub[0].sub[0].name,
                countys:countys,
                values: val,
                value:[val[0],0,0]
            });

            return;
        }
        if(val[1] != t[1]){
            console.log('city');
            const countys = [];

            for (let i = 0 ; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
                countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
            }

            this.setData({
                city: this.data.citys[val[1]],
                county: cityData[val[0]].sub[val[1]].sub[0].name,
                countys:countys,
                values: val,
                value:[val[0],val[1],0]
            })
            return;
        }
        if(val[2] != t[2]){
            console.log('county');
            this.setData({
                county: this.data.countys[val[2]],
                values: val
            })
            return;
        }
    },
    open:function(){
        this.setData({
            condition:!this.data.condition
        })
    },
    onLoad: function (options) {
        // 获取用户id与产品id
        this.setData({
            goods_id:options.goods_id,
            user_id:options.user_id,
            prize:options.prize
        });

        let that = this;
        tcity.init(that);

        let cityData = that.data.cityData;

        const provinces = [];
        const citys = [];
        const countys = [];

        for(let i=0;i<cityData.length;i++){
            provinces.push(cityData[i].name);
        }

        for (let i = 0 ; i < cityData[0].sub.length; i++) {
            citys.push(cityData[0].sub[i].name)
        }

        for (let i = 0 ; i < cityData[0].sub[0].sub.length; i++) {
            countys.push(cityData[0].sub[0].sub[i].name)
        }

        that.setData({
            'provinces': provinces,
            'citys':citys,
            'countys':countys,
            'province':cityData[0].name,
            'city':cityData[0].sub[0].name,
            'county':cityData[0].sub[0].sub[0].name
        });

        wx.setNavigationBarTitle({
            title: '信息提交'
        })


    },
    formSubmit: function(e) {
        let formData = e.detail.value;
        let that = this;
        if(e.detail.value.user != "" && e.detail.value.number != "" && e.detail.value.detailAdd != ""){
            wx.request({
                url:"https://dati.51laiding.com/?r=goods/change",
                method:"GET",
                data:{
                    user_id: that.data.user_id,
                    goods_id:that.data.goods_id,
                    prize:that.data.prize,
                    userName: formData.user,
                    number: formData.number,
                    address: formData.address,
                    detailAdd: formData.detailAdd
                },
                success:function (res) {
                    wx.navigateTo({
                        url:'../succeed/succeed'
                    })
                }
            });
        }else {
            //微信自带的模态框，告诉用户充值成功
            wx.showToast({
                title:"你还有内容没有填写",
                duration:2000,
                icon:"none"
            });
        }
    },
    close:function () {
        this.setData({
            hint:true
        })
    }
});