window.addEventListener('load', function () {
    // 1.获取元素
    var box = document.querySelector('.box');
    var ul = box.children[0];
    // 获得box的宽度
    var w = box.offsetWidth;
    var ol = box.children[1];
    // 2.利用定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function () {
        index++;
        var translateX = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }, 2000);

    // 等着ul过渡完成之后，再去判断，监听过渡完成的事件 transitionend
    ul.addEventListener('transitionend', function () {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // 去掉过渡效果，快速跳到目标位置
            ul.style.transition = 'none';
            // 利用新的索引号乘以宽度 去滚动图片
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        } else if (index < 0) {
            index = 2;
            // 去掉过渡效果，快速跳到目标位置
            ul.style.transition = 'none';
            // 利用新的索引号乘以宽度 去滚动图片
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }
        // 3.小圆点跟随变化效果
        // 把ol里面li带有current类名的选出来去掉类名 remove
        ol.querySelector('.current').classList.remove('current');
        // 让当前索引号的小li 加上 current add
        ol.children[index].classList.add('current');
    })

    // 4.手指滑动轮播图
    // 触摸元素 touchstart: 获取手指初始坐标
    var startX = 0; //保存鼠标开始位置
    var moveX = 0; //记录移动的距离
    var flag = false; //记录是否移动，减少判断
    ul.addEventListener('touchstart', function (e) {
        // 记录鼠标初始位置
        startX = e.targetTouches[0].pageX;
        // 当手指按下时停止定时器
        clearInterval(timer);
    });
    // 移动手指 touchmove 计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function (e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子
        var translateX = -index * w + moveX;
        // 手指移动盒子时取消过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translateX + 'px)';
        flag = true; // 如果用户手指移动过我们再去判断否则不做判断
        e.preventDefault(); //阻止屏幕滚动行为
    });
    // 手指离开 根据移动距离去判断是回弹还是播放下一张上一张
    ul.addEventListener('touchend', function () {
        if (flag) {
            // 1) 如果移动距离大于50像素我们就播放上一张或者下一张
            if (Math.abs(moveX) > 50) {
                // 如果是右滑是播放上一张
                if (moveX > 0) {
                    index--;
                } else {
                    // 如果是左滑就是播放下一张
                    index++;
                }
                var translateX = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            } else {
                // 2）如果小于50像素就回弹
                var translateX = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
        }
        // 手指离开  先清除原有的定时器  再启动定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translateX = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }, 2000);
    })
})