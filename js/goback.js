window.addEventListener('load',function(){
    // 1.获取元素
    var goBack = document.querySelector('.goBack');
    var second = document.querySelector('.second');

    window.addEventListener('scroll',function(){
        if(window.pageYOffset >= second.offsetTop){
            goBack.style.display = 'block';
        }else{
            goBack.style.display = 'none';
        }
    })

    goBack.addEventListener('touchstart',function(){
        window.scroll(0,0);
    })
    // function animate(obj, target, callback) {
    //     clearInterval(obj.timer);
    //     obj.timer = setInterval(function () {
    //             // 步长值写到定时器里面
    //             // 把步长值该为整数
    //             var step = (target - window.pageYOffset) / 10;
    //             // 当step>0时往向上取值，反之则向小取值
    //             step = step > 0 ? Math.ceil(step) : Math.floor(step);

    //             if (window.pageYOffset === target) {
    //                 // 停止动画，本质就是停止定时器
    //                 clearInterval(obj.timer);
    //                 // 回调函数放到定时器结束后执行，先判断是否有回调函数，有则执行
    //                 // if(callback){
    //                 //     callback();
    //                 // }
    //                 // &&是短路运算符，当遇到一个不为真时就停止后面的操作
    //                 callback && callback();
    //             }
    //             // 将每次步长值该为逐渐变小的值  
    //             // obj.style.left = window.pageYOffset + step + 'px';
    //             // window.scroll(x,y) 窗口移动函数，里面的X,Y不跟单位 直接写数字
    //             window.scroll(0, window.pageYOffset + step);
    //         },
    //         15)
    // }
})