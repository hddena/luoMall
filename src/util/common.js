const STORAGE_USER_KEY = 'STORAGE_USER_KEY'
// const STORAGE_CARTLIST_KEY = 'STORAGE_CARTLIST_KEY'
// const STORAGE_QUERYMYLIST_KEY = 'STORAGE_QUERYMYLIST_KEY'

export default {
    // 获取
    getLocal (key = STORAGE_USER_KEY) {
    // console.log('get local operation')
    return JSON.parse(window.localStorage.getItem(key))
    },
    // 设置用
    setLocal (res, key = STORAGE_USER_KEY, isSaveOldData = false) {
    //第三个参数是true的话,会增加数据而不是重新设置,res必须是数组
    if (isSaveOldData) {
      if(this.getLocal(key)) {
        let oldData = this.getLocal(key);
        console.log(oldData);
        return window.localStorage.setItem(key, JSON.stringify(oldData.concat(res)))
      }
    }
    return window.localStorage.setItem(key, JSON.stringify(res))
    },

    //删除 removeItem
    removeLocal (key = STORAGE_USER_KEY) {
    // console.log('get local operation')
    return window.localStorage.removeItem(key)
    },

//封装localStorage过期控制代码
setLocalStorage(key, value ,dTime) {
    var curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列 
    var valueDate = JSON.stringify({
        data: value,
        timer: curtime,
        diff: dTime,
    });
    try {
        localStorage.setItem(key, valueDate);
    } catch(e) {
        /*if(e.name === 'QUOTA_EXCEEDED_ERR' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            console.log("Error: 本地存储超过限制");
            localStorage.clear();
        } else {
            console.log("Error: 保存到本地存储失败");
        }*/
        // 兼容性写法
        if(this.isQuotaExceeded(e)) {
            console.log("Error: 本地存储超过限制");
            localStorage.clear();
        } else {
            console.log("Error: 保存到本地存储失败");
        }
    }
},
isQuotaExceeded(e) {
    var quotaExceeded = false;
    if(e) {
        if(e.code) {
            switch(e.code) {
                case 22:
                    quotaExceeded = true;
                    break;
                case 1014: // Firefox 
                    if(e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        quotaExceeded = true;
                    }
                    break;
            }
        } else if(e.number === -2147024882) { // IE8 
            quotaExceeded = true;
        }
    }
    return quotaExceeded;
},
getLocalStorage(key) {
    var exp = 60 * 60 * 24; // 一天的秒数
    if(localStorage.getItem(key)) {
        var vals = localStorage.getItem(key); // 获取本地存储的值 
        var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
        // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间 
        var isTimed = (new Date().getTime() - dataObj.timer) > exp;
        if(isTimed) {
            console.log("存储已过期");
            localStorage.removeItem(key);
            return null;
        } else {
            var newValue = dataObj.val;
        }
        return newValue;
    } else {
        return null;
    }
},
/*
https://www.cnblogs.com/yaowan/p/9540633.html
setLocalStorage('name', 'hello, world');
var localKey = getLocalStorage('name');
console.log(localKey);
*/


//封装localStorage过期控制代码 end


    getClassList(t){
      let e = this;
      t.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: '/api/product/getclassList',
        //url: '/mobile/index.php?m=console&c=view&a=view',
        params: {
          id:1,
          name:2
        }
      }).then((response) => {
        //this.classList = response.data.data;
        //console.log('getClassList:'+response.data.msg);
        e.setLocal(response.data,'classList')
        data = response.data;
      }).catch(function(error) {
        console.log(error)
      })
      return data;
    },

    fetchData(url,dataObj,thisObj,params,state){ //获取数据
      let t = thisObj;
      t.$dataApi({
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        url: url,
        params: params
      }).then((response) => {
        this.setLocal(response.data.data , dataObj )
        console.log( dataObj + ' 更新 localStorage 数据成功！')
      }).catch(function(error) {
        console.log(error)
      })
    },


    //设置 cookie
    setCookie(objName, objValue, objHours){//添加cookie
        var str = objName + "=" + encodeURIComponent(objValue);
        if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
            var date = new Date();
            var ms = objHours * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toUTCString();
        }
        document.cookie = str;
    },

    //获取 cookie
    getCookie(objName){//获取指定名称的cookie的值
        //多个cookie 保存的时候是以 ;空格  分开的
        console.log(document.cookie);
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == objName){
                return decodeURIComponent(temp[1]);
            }else{
                return "";
            }
                
        }
    },

    //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
    delCookie(name){
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=a; expires=" + date.toUTCString();
    },

    //清除所有cookie函数
    clearAllCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys) {
            for(var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    },


    isLogin(t){ // 获取当前用户信息   ---   是否已经登录
        //let paramsB = qs('id:41')
        t.$dataApi({
          headers: {'Content-Type': 'multipart/form-data'},
          method: 'post',
          url: '/api/member/getMember',
          //url: '/mobile/index.php?m=console&c=view&a=view',
          params: {
            id:1,
            name:2
          }
        }).then((response) => {
            let ret = response.data.ret;
            console.log(response.data);
            //console.log(response.data.ret , ret);
          if ( ret == 1 ) {
            t.$store.commit('CHANGE_TOKEN',1);
            return true;
          } else if ( ret == undefined) {
            t.$store.commit('CHANGE_TOKEN',0);
            t.$router.replace({
              path: '/login'
              //path: 'user'
            })
            return false;
          } else {
            console.log('isLogin 是否已经登录！');
            return true;
          }
        }).catch(function(error) {
          console.log(error)
        })
    },

    domainName() {
        let url_hr = window.location.href;    //完整的URL  http://localhost:8080/project/front/user/serviceIndex?type=1
        console.log('完整的URL：'+url_hr);

        let url_pr = window.location.protocol;    //协议  http:
        console.log('协议：'+url_pr);

        let url_hn = window.location.hostname;    //主机名  localhost
        console.log('主机名：'+url_hn);

        let url_po = window.location.port;    //端口号  8080
        console.log('端口号：'+url_po);

        let url_ho = window.location.host;    //主机名+端口号  localhost:8080
        console.log('主机名+端口号：'+url_ho);

        let url_pa = window.location.pathname;    //当前 URL 的相对路径  /project/front/user/serviceIndex
        console.log('当前 URL 的相对路径：'+url_pa);

        let url_se = window.location.search;  //当前 URL 的参数  ?type=1
        console.log('当前 URL 的参数：'+url_se);

        let url_ha = window.location.hash;    //#开始的锚   
        console.log('#开始的锚：'+url_ha);

        let domainName = url_pr+'//'+url_hn+url_pa+url_ha; //当前域名地址
        console.log('当前域名地址：'+domainName);

    },

    extensionCode(val) { //地址栏添加推广码
        let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        if (userInfo) {
            let recomNum = userInfo.data.recomNum;
            var stateObj = {title:'',url:window.location.href};
            window.history.pushState(stateObj,'page2','?recomNum='+recomNum);
        } else {
            console.log('用户未登录或推广码不荐在！')
        }
    },

//用JS获取地址栏参数的方法
    getQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
        if(r!=null)return  unescape(r[2]); return null;
    },
// 调用方法
//alert(getQueryString("参数名"));

    shuffle(arr) { //数组随机排序
        return arr.sort(() => Math.random() - 0.5);
    },

    carTimeDifference(){ // 时间差的作用是为了超出时间后删除购物车内容
        let timeDifference , carToday , nowToday = new Date().getDate() , timeDifferenceLocal = window.localStorage.getItem('timeDifferenceLocal');// 获取localStorage日期
        if (timeDifferenceLocal) { // 判断是否存在值
            carToday = new Date(JSON.parse(timeDifferenceLocal)).getDate(); 
            timeDifference = nowToday - carToday ;  // 今天的日期减去储存日期
            console.log('日期差为'+timeDifference+'天！');
            if (timeDifference >= 3) { // 判断日期是否己过期
                window.localStorage.removeItem('count'); // 清空购物车内容！
                window.localStorage.removeItem('carList'); // 清空购物车内容！
                // window.localStorage.removeItem('carTimeDifference'); // 删除旧时间
                window.localStorage.setItem('timeDifferenceLocal', new Date().getTime()); // 重新保存新时间 ，直接覆盖旧时间
                console.log('购物车内容已清空并重新设置新的时间！');
            } else {
                console.log('保留购物车内容！');
            }
        } else {
            window.localStorage.removeItem('count'); // 清空购物车内容！
            window.localStorage.removeItem('carList'); // 清空购物车内容！
            //window.localStorage.setItem('key', JSON.stringify(oldData.concat(res)))
            window.localStorage.setItem('timeDifferenceLocal', new Date().getTime());
            console.log('本地没有监控购物车的时间差，删除旧数据并设置监控购物车的时间差！');
        }
    },

    userTimeDifference(){ // 时间差的作用是为了超出时间后删除本地用户信息
        let 
        timeDayDifference , timeHouDifference , timeMinDifference,
        userInfo = window.localStorage.getItem('userInfo'),// 获取 localStorage 本地 userInfo 信息
        nowToday = new Date().getDate(), //今天几号
        nowHours = new Date().getHours(), // 当前是几点
        nowMinutes = new Date().getMinutes(); // 当前是几分钟

        // console.log('今天是'+nowToday+'号，当前时间'+nowHours+':' + nowMinutes);

        if (userInfo) { // 判断是否存在值
            let
            userDay = new Date(JSON.parse(userInfo).timer).getDate(),
            userHou = new Date(JSON.parse(userInfo).timer).getHours(),
            userMin = new Date(JSON.parse(userInfo).timer).getMinutes();
            // console.log(userDay , userMin);
            timeDayDifference = nowToday - userDay ;  // 今天的日期减去储存用户日期
            timeHouDifference = nowHours - userHou ;   // 今天的日期减去储存用户日期
            timeMinDifference = nowMinutes - userMin ;   // 今天的日期减去储存用户分钟

            // console.log(timeDayDifference , timeHouDifference , timeMinDifference);
            // console.log(timeDayDifference >= 0 , timeHouDifference >= 0 , timeMinDifference > 2);
            // console.log(timeDayDifference >= 0 && timeHouDifference >= 0 && timeMinDifference > 2);

            if (timeDayDifference > 0 ) { // 判断日期是否己过期
                window.localStorage.removeItem('userInfo'); // 清空本地用户信息内容！
                console.log('本地用户信息超过一天已经清除！');
                location.reload(); //信息清除后刷新页面
            } else if (timeHouDifference > 0) { // 判断日期是否己过期
                window.localStorage.removeItem('userInfo'); // 清空本地用户信息内容！
                console.log('本地用户信息超过一小时已经清除！');
                location.reload(); //信息清除后刷新页面
            } else if (timeMinDifference > 30) { // 判断日期是否己过期
                window.localStorage.removeItem('userInfo'); // 清空本地用户信息内容！
                console.log('本地用户信息超过三十分钟已经清除！');
                location.reload(); //信息清除后刷新页面
            } else {
                // this.$store.commit('USER_INFO',response.data.data); //用户信息赋值到 Vuex
                // console.log(userInfo);
                console.log('保留本地用户信息！');
            }
        } else {
            // window.localStorage.removeItem('userInfo'); // 清空本地用户内容！
            console.log('本地用户不存在！');
        }

    },

   //计算天数差的函数，通用  
    GetDateDiff(startTime, endTime, diffType) {
        //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
        startTime = startTime.replace(/\-/g, "/");
        endTime = endTime.replace(/\-/g, "/");
        //将计算间隔类性字符转换为小写
        diffType = diffType.toLowerCase();
        var sTime =new Date(startTime); //开始时间
        var eTime =new Date(endTime); //结束时间
        //作为除数的数字
        var timeType =1;
        switch (diffType) {
            case"second":
                timeType =1000;
            break;
            case"minute":
                timeType =1000*60;
            break;
            case"hour":
                timeType =1000*3600;
            break;
            case"day":
                timeType =1000*3600*24;
            break;
            default:
            break;
        }
        return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
    },


    proClassList(self ) { // 产品类别列表（分类）
        let post = ()=>{
            return new Promise(resolve => {
                self.$dataApi({
                    headers: {'Content-Type': 'multipart/form-data'},
                    method: 'post',
                    url: '/api/product/getclassList',
                    //url: '/mobile/index.php?m=console&c=view&a=view',
                    params: {
                        CID:1
                    }
                }).then(response => {
                    resolve(response.data);
                })
            });
        }
        let result = post();
        return result;
    },

    proList(self , stateUserInfo , stateImgPath) { // 产品类别列表（分类）
        let params;
        if (stateUserInfo == null) {
            params = {
                showAll:0,  // 0 按下面设置的会员等级显示，1 全部商品显示
                childType:4,  // 小类
                userType:1     // 大类
            };
            // console.log('stateUserInfo值为空，使用默认值！')
        }else{
            // console.log('stateUserInfo有值！')
            if (stateUserInfo.userType == 1 && stateUserInfo.childType == 0) { // 普通
                params = {
                    showAll:0,  // 0 按下面设置的会员等级显示，1 全部商品显示
                    childType:4,  // 小类
                    userType:1     // 大类
                };
            } else if (stateUserInfo.userType == 2 && stateUserInfo.childType == 0) { // 代理
                params = {
                    showAll:0,  // 0 按下面设置的会员等级显示，1 全部商品显示
                    childType:6,  // 小类
                    userType:2     // 大类
                };
            } else if (stateUserInfo.userType == 3 && stateUserInfo.childType == 0) { // 分公司
                params = {
                    showAll:0,  // 0 按下面设置的会员等级显示，1 全部商品显示
                    childType:8,  // 小类
                    userType:3     // 大类
                };
            } else {
                params = {
                    showAll:0,  // 0 按下面设置的会员等级显示，1 全部商品显示
                    childType:stateUserInfo.childType,  // 小类
                    userType:stateUserInfo.userType     // 大类
                };
            }
        }
        if (stateUserInfo) {
            // console.log('会员身份为：'+stateUserInfo.userTypeName,params);
        } else {
            // console.log(params);
        }
        let post = ()=>{
            return new Promise(resolve => {
                self.$dataApi({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    method: 'post',
                    url: '/api/product/getproList',
                    //0 所有人可见  1 普通会员  4 普通会员A  5 普通会员B  2 代理  6 代理A  7 代理B  3 分公司  8 分公司A  9 分公司B
                    data: params
                }).then(response => {
                    let resData = response.data.data;
                    for (var i = 0; i < resData.length; i++) {
                        resData[i].pimg = resData[i].pimg.split(',');
                    }
                    resolve(resData);
                })
            });
        }
        let result = post();
        return result;
    },

    newsList(self, classID ) { // 资讯列表（分类）
        let post = ()=>{
            return new Promise(resolve => {
                self.$dataApi({
                    headers: {'Content-Type': 'multipart/form-data'},
                    method: 'post',
                    url: '/api/news/getListByCID',
                    //url: '/mobile/index.php?m=console&c=view&a=view',
                    params: {
                        CID:classID
                    }
                }).then(response => {
                    resolve(response.data);
                })
            });
        }
        let result = post();
        return result;
    },

    newsDetail(self, id ) { // 资讯详情
        let post = ()=>{
            return new Promise(resolve => {
                self.$dataApi({
                    headers: {'Content-Type': 'multipart/form-data'},
                    method: 'get',
                    url: '/api/news/getdetail',
                    //url: '/mobile/index.php?m=console&c=view&a=view',
                    params: {
                        newsID:id
                    }
                }).then(response => {
                    resolve(response.data);
                })
            });
        }
        let result = post();
        return result;
    },

    getMember(self) { // 获取当前用户信息（会员）
        let post = ()=>{
            return new Promise(resolve => {
                self.$dataApi({
                    headers: {'Content-Type': 'multipart/form-data'},
                    method: 'post',
                    url: '/api/member/getMember',
                    //url: '/mobile/index.php?m=console&c=view&a=view',
                    params: {
                        id:1,
                        name:2
                    }
                }).then(response => {
                    resolve(response.data);
                })
            });
        }
        let result = post();
        return result;
    },
    updateMember( self , parameter ) { // 更新会员信息（会员）
        let post = ()=>{
            return new Promise(resolve => {
                self.$dataApi({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    method: 'post',
                    url: '/api/member/updateMember',
                    //url: '/mobile/index.php?m=console&c=view&a=view',
                    data: parameter 
                }).then(response => {
                    resolve(response.data);
                })
            });
        }
        let result = post();
        return result;
    },

}
