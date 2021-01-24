// 简要说明防抖函数和节流函数，并编程实现
const debounce = (fn, wait) => {
    let timer = null;
    return () => {
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(fn, wait);
    }
}

const throttle = (fn, wait) => {
    let lastTime = 0;
    return () => {
        let now = + new Date();
        if(now - lastTime > wait){
            lastTime = now;
            fn();
        }
    }
}