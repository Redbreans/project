$(function () {
    // 轮播js
    var nowimg = 0;
    var timer = null;
    $(".list_item").css({
        "cursor": "pointe"
    })
    $(".head-banner li:first").clone().appendTo('.head-banner').css({
        "background-image": "url('./images/indexImage/index_banner/index_banner1.jpg')",
        "background-size": "100% 100%",
        "background-repeat": "no-repeat"
    })

    function rightFunc() {
        if (nowimg < 2) {
            nowimg++
            $(".head-banner").animate({
                "left": nowimg * -1347
            }, 1500)
            // console.log("1111")
        } else {
            nowimg = 0
            $(".head-banner").animate({
                "left": 3 * -1347
            }, 2000, function () {
                $(".head-banner").css("left", 0)
                // console.log("2222")

            })
        }
    }
    timer = setInterval(rightFunc, 2000)
    $(".head-banner").mouseenter(function () {
        clearInterval(timer)
    })

    // 导航js
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > 300) {
            $(".head-nav").addClass("head-nav1")
            $(".head-nav>ul>li>a").css({
                "color": "#000000"
            })
            $(".head_nav_right_i>i").addClass("box_input1")
            $(".box_input").css({
                "border": "1px solid #ff0066"
            })
            $(".section-button").show(500, function () {
                //回调函数，设置点击按钮执行相应功能
            })
        }
        if (scrollTop < 10) {
            $(".head-nav").removeClass("head-nav1")
            $(".head-nav>ul>li>a").css({
                "color": "white"
            })
            $(".head_nav_right_i>i").removeClass("box_input1");
            $(".box_input").css({
                "border": "1px solid white"
            })

        }
    })


    // 系列下拉菜单js
    // var imgarr=new Array(['../images/menuImage/sonMenu_fresh.jpg'])
    $(".product_txt").mouseenter("click", function () {
        $(".product_list").toggle(500)
        $(".product_img").toggle(500)
        // $(".product_list>ul>li:nth-child(1)").on('click',function(){
        //     $(".product_img>div:nth-child(1)").css({"background":"url(../images/menuImage/sonMenu_fresh.jpg)"})
        //     console.log(imgarr[0])
        //     console.log("1111")
        // })
    })







    // 登录注册弹出框js  
    $('.icon-gerenzhongxin').on('click', function () {
        $.ajax({
            type: 'post',
            url: 'isLogin',
            success(data) {
                if (data == 'false') {
                    layer.open({
                        type: 2,
                        title: false,
                        shade: [0.8],
                        maxmin: false,
                        shadeClose: true,
                        // anim: 2,
                        content: ['login.html', 'no'], //iframe的url，no代表不显示滚动条
                        area: ['680px', '458px'],
                        content: 'login.html'
                    });
                } else {

                    if (location.href.search('personal-center') > 0) {
                        $.ajax({
                            url: 'orderList',
                            type: 'post',
                            success(data) {
                                // console.log(data)
                                showOrders()(data);
                            },
                            error(err) {
                                console.log(err)
                            }
                        })
                    } else {
                        location.href = 'personal-center.html';
                    }

                }
            }
        })
    });

    // 登录注册切换js
    $(".l_z>span:nth-child(1)").on('click', function () {
        $("#denglu").css({
            "display": "block"
        })
        $(".l_z>span:nth-child(2)").css({
            "border-bottom": "none"
        })
        $(this).css({
            "border-bottom": "4px solid #ff0066"
        })
        $("#zhuce").css({
            "display": "none"
        })
        // console.log("1111")
    })
    $(".l_z>span:nth-child(2)").on('click', function () {
        $("#denglu").css({
            "display": "none"
        })
        $(".l_z>span:nth-child(1)").css({
            "border-bottom": "none"
        })
        $(this).css({
            "border-bottom": "4px solid #ff0066"
        })
        $("#zhuce").css({
            "display": "block"
        })
        // console.log("2222")
    })
    $(".input_checkbox>a").on('click', function () {
        $("#wangji").css({
            "display": "block"
        })
        $("#zhuce").css({
            "display": "none"
        })
        $("#denglu").css({
            "display": "none"
        })
        $(".l_z").css({
            "display": "none"
        })

    })
})

$('#logBtn').click(function () {
    let data = $('#denglu').serialize();
    $.ajax({
        url: 'login',
        type: 'post',
        data: data,
        success(data) {
            if (data == 'ok') {
                window.parent.location.reload();
            } else {
                console.log('登录失败')
            }
        },
        error(err) {
            console.log(err)
        }
    })
});

/**
 * 重置密码
 */

$('#resetPwd').click(function () {
    if (typeof isOk != 'undefined' && isOk) {
        let data = $('#wangji').serialize();
        $.ajax({
            url: 'resetPwd',
            type: 'post',
            data: data,
            success(data) {
                if (data == 'ok') {
                    console.log('密码重置成功')
                    $("#wangji").css({
                        "display": "none"
                    })
                    $(".l_z").css({
                        "display": "block"
                    })
                    $("#denglu").css({
                        "display": "block"
                    })
                } else {
                    console.log('密码重置失败')
                }
            },
            error(err) {
                console.log(err)
            }
        })
    } else {
        alert('验证码错误');
    }

});

// isOk = true 
$('#wangji .getIdent_code').click(function () {
    getYz($('#wangji'), function () {
        window.isOk = true;
    });
});
$('#zhuce .getIdent_code').click(function () {
    getYz($('#zhuce'));
});
/* 
 *   注册
 */
$('#regBtn').click(function () {
    let data = $('#zhuce').serialize();
    $.ajax({
        url: 'register',
        data: data,
        type: 'post',
        success(data) {
            if (data == 'ok') {
                console.log('注册成功');
            } else {
                consoel.log('注册失败');
            }
        },
        error(err) {
            console.log(err)
        }
    })
})

/**
 * 个人中心页面渲染
 */

function showOrders() {
    var orderBox = $('.person-info .orders');
    var tabs = orderBox.first().children();
    var str = '';
    return function (data) {
        for (item in data) {
            let order = data[item];
            str += `<div class="order-item">
        <p>订单号 :
            <span>${order.orderunique}</span>
            <time>${formatDate(order.createTime)}</time>
            <em>待支付
                <span>[5:00]</span>
            </em>
        </p>
        <div class="order-goods clearfix">
            <img src="./images/personalImage/personal_goodsPic.jpg" alt="">
            <ul>
                <li>商品名称 :
                    <span>${order.goodsName}</span>
                </li>
                <li>颜色 :
                    <span>${goodSpec().color(order.color) }</span>
                </li>
                <li>尺码 :
                    <span>${goodSpec().color(order.size) }</span>
                </li>
                <li>备注 :
                    <span>${order.orderRemarks}</span>
                </li>
                <li>运费 :
                    <strong>¥ ${order.deliverMoney}</strong>
                </li>

                <li>获得积分 :
                    <strong>${order.orderScore}</strong>
                </li>
                <li>价格 :
                    <strong>¥ ${order.realTotalMoney}</strong>
                </li>
                <li>数量 :
                    <strong>
                        <em>&#45;</em>
                        <input type="text" value="${order.goodsNum}">
                        <em>&#43;</em>
                    </strong>
                </li>
            </ul>
            <a href="#">查看详情</a>
            <div>
                <a href="#">立即支付</a>
                <a href="#">取消订单</a>
            </div>

        </div>
    </div>`;

        }
        orderBox.html(`<ul class="tab">
        <li class="active">全部订单</li>
        <li data-num="1">待支付</li>
        <li data-num="1">正在处理</li>
        <li data-num="1">已完成</li>
    </ul>` + str);
    console.log(orderBox)
    }

}

$('')
/* 
 *  获取验证码
 */
function getYz(dom, fn) {
    $.ajax({
        url: 'getIdent',
        type: 'post',
        data: `&phone=${dom.find('input[name="username"]').val()}`,
        success(data) {
            if (data == 'success') {
                console.log('短信发送成功!');
                dom.find('.identCode').change(function () {
                    $.ajax({
                        url: 'verifyCode',
                        type: 'post',
                        data: `&smscode=${dom.find('.identCode').val()}&phone=${dom.find('input[name="username"]').val()}`,
                        success(data) {
                            if (data == 'success') {
                                console.log('短信验证成功!')
                                fn && fn();
                            } else {
                                console.log('短信验证失败!')
                            }
                        },
                        error(err) {
                            console.log(err)
                        }
                    })
                })
            } else {
                console.log('短信发送失败!')
            }
        },
        error(err) {
            console.log(err)
        }
    })

}


/**
 * 格式或日期
 */
function formatDate(dateStr) {
    var iDate = new Date(dateStr);

    function addZreo(num) {
        return num < 10 ? '0' + num : num;
    }
    return iDate.getFullYear() + '-' + (addZreo(iDate.getMonth() + 1)) + '-' + addZreo(iDate.getDate());

}
/**
 * 商品规格处理
 */
function goodSpec() {
    let goodSpec = {
        color(color) {
            var str = '';
            switch (color) {
                case 0:
                    str = '红色';
                    break;
                case 1:
                    str = '粉色';
                    break;
                    break;
                    str = '黑色';
                    break;
                case 2:
                    break;
                default:
                    str = '白色';
            }
            return str
        },
        size(size) {
            var str = '';
            switch (size) {
                case 0:
                    str = '31';
                    break;
                case 1:
                    str = '32';
                    break;
                    break;
                    str = '33';
                    break;
                case 2:
                    break;
                default:
                    str = '34';
            }
            return str
        }
    }
    return goodSpec
}