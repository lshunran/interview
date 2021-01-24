// 问：vue中的数据代理如何实现
const vm=new MVVM({
    el:'#app',
    data:{
        a:'名字',
        b:'b',
        c:'c'
    }
});

vm._data.a;

function MVVM(options){
    let self = this;
    let data = self._data = options.data;

    Object.keys(data).forEach((key) => {
        self._proxy(key);
    })
}

MVVM.prototype._proxy = function(key){

    let self = this;

    Object.defineProperty(self, key, {
        set(v){
           self._data[key] = v; 
        },
        get(){
            return self._data[key];
        }
    })
}