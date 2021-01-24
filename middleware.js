// nodejs express原理
function express() {
    var funcs = [] // 中间件存储的数组
    var app = function (req, res) {
        var i = 0  
        // 定义next()
        function next() {
            var task = funcs[i++]  // 取出中间件数组里的下一个中间件函数
            if (!task) {    // 如果中间件不存在,return
                return
            }
            task(req, res, next);   // 否则,执行下一个中间件
        }
        next()
    }
    // use方法则是将中间件函数推入到中间件数组中
    app.use = function (task) {
        funcs.push(task);
    }
    return app    // 返回实例
}

function express(){
    let mids = [];
    let app = function(req, res){
        let i = 0;
        function next(){
            let task = mids[i++];
            if(!task) return;
            task(req, res, next);
        }
        next();
    }

    app.use = function(mid){
        mids.push(mid);
    }

    return app;
}