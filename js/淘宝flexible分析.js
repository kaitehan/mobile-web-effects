(function(window,document){
    // 获取html的根元素对象
    var docEl = document.documentElement;
    // dpr 物理像素比
    var dpr = window.devicePixelRatio || 1;

    // adjust body font size 设置body字体大小
    function setBodyFontSize() {
        // 如果页面有BODY元素  就设置body 的字体大小
        if(document.body){
            document.body.style.fontSize = (12 * dpr)+'px';
        }else{
            // 如果页面中没有body元素，则等到DOM元素加载完毕后再去设置body
            document.addEventListener('DOMContentLoaded',setBodyFontSize);
        }
    }

    setBodyFontSize();

    // set 1rem = ViewWidth /10;
    function setRemUnit(){
        var rem = docEl.clientWidth / 10;
        docEl.style.fontSize = rem + 'px';
    }

    setRemUnit();

    // reset rem unit on page reize  当我们页面尺寸大小发生变化的时候，要重新设置下rem的大小
    window.addEventListener('resize',setRemUnit);
    // pageshow  是我们重新加载页面触发的事件
    window.addEventListener('pageshow',function(e){
        // e.persisted 返回的是true 就是说如果这个页面是从缓存取过来的页面，也需要重新计算一下rem 的大小
        if(e.persisted){
            setRemUnit();
        }
    })

    // detect 0.5px supports  有些移动端的浏览器不支持0.5px的写法
    if(dpr >= 2) {
        var fakeBody = document.createElement('body');
        var testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if(testElement.offsetHeight === 1){
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window,document))