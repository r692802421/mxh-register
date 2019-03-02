/*
 *微信自定义分享
 */

    var url = location.href.split('#')[0];//url不能写死
    $.ajax({
        type: "get",
        //url: "http://app.meibbc.com/BeautifyBreast/questionnaire!getdata.action",
        url: "../../../user-core/user/controller/SysController.html?behavior=getdata",
        dataType: "json",
        async: false,
        data: {url: url},
        success: function (data) {
        	console.log(data);
            wx.config({
                debug: false,////生产环境需要关闭debug模式
                appId: "wx7ee90195b0f6646c",//appId通过微信服务号后台查看
                timestamp: data.data.timestamp,//生成签名的时间戳
                nonceStr: data.data.dnonceStr,//生成签名的随机字符串
                signature: data.data.signature,//签名
                jsApiList: [//需要调用的JS接口列表
                    'checkJsApi',//判断当前客户端版本是否支持指定JS接口
                    'onMenuShareTimeline',//分享给好友
                    'onMenuShareAppMessage'//分享到朋友圈
                ]
            });
        },
        error: function (xhr, status, error) {
            //alert(status);
            //alert(xhr.responseText);
        }
    });



    wx.ready(function () {
        var link = window.location.href;
        var protocol = window.location.protocol;
        var host = window.location.host;
        //分享朋友圈
        wx.onMenuShareTimeline({
            title: "注册成为美胸汇会员",
            link: link,
            imgUrl: "https://beautify-breast.oss-cn-shenzhen.aliyuncs.com/BeautifyBreast/file/images/logo.png",// 自定义图标
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回.
                //alert('click shared');
            },
            success: function (res) {
                //alert('shared success');
                //some thing you should do
            },
            cancel: function (res) {
                //alert('shared cancle');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
        //分享给好友
        wx.onMenuShareAppMessage({
            title: "注册成为美胸汇会员", // 分享标题
            desc: '美胸汇，让你更美！', // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "https://beautify-breast.oss-cn-shenzhen.aliyuncs.com/BeautifyBreast/file/images/logo.png", // 自定义图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.error(function (res) {
            //alert(res.errMsg);
        });
    });


