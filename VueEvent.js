// 实现一个eventBus（重点）
function EventCenter() {
    // 全局定义一个_events属性，存储事件
    this._events = Object.create(null);
} 
// 通过eventMixin方法在EventCenter的原型上挂载方法
eventMixin(EventCenter);

export default EventCenter;

EventCenter.prototyoe.on = function(event, fn) {
    const ec = this;
    if (Array.isArray(event)) {
        for (let i = 0; i < event.length; i++) {
            ec.on(event[i], fn)
        }
    } else {
        (ec._events[event] || (ec._events[event] = [])).push(fn);
    }
}

EventCenter.prototyoe.off = function(event, fn) {
    const ec = this;
    // 判断如果不传参数， 则移除所有事件
    if (!arguments.length) {
        ec._events = Object.create(null);
    }
    // event为数组时，遍历移除事件
    if (Array.isArray(event)) {
        for(let i = 0; i < event.length; i++) {
            ec.off(event[i], fn);
        }
        return ec;
    }
    const cbs = ec._events[event];
    // 回调不存在 直接返回
    if (!cbs) {
        return ec;
    }
    // cbs为一个或者fn不存在，ec._events[event] = null， 直接移除
    if (arguments.length === 1) {
        ec._events[event] = null;
        return ec;
    }
    if (!fn) {
        ec._events[event] = null;
        return ec;
    }
    // 否则，遍历cbs，移除cbs中为fn的回调函数
    let cb;
    let i = cbs.length;
    // 从后向前遍历，移除当前监听器时，不会影响未遍历过的监听器的位置。
    while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
            cbs.splice(i, 1);
            break;
        }
    }
    return ec;
}
EventCenter.prototyoe.once = function(event, fn) {

    const ec = this;
    // 自定义一个_on方法，先解绑_on, 然后通过调用apply方法执行fn。
    function _on() {
        ec.off(event, _on);
        fn.apply(ec, arguments);
    }
    _on.fn = fn;
    ec.on(event, _on);
    return ec;
}

EventCenter.prototype.emit = function(event) {
    const ec = this;
    let cbs = ec._events[event];
    if (cbs) {
        // 拿到传参
        const args = Array.from(arguments).slice(1);
        for(let i = 0; i < cbs.length; i++) {
            try {
                cbs[i].apply(ec, args);
            } catch(e) {
                new Error('error');
            }
        }
    }
    return ec;
}

var EventCenter