// 问：什么是promise A+规范，请简单实现一个
const PENDING = Symbol('pending');
const RESOLVE = Symbol('resolve');
const REJECT = Symbol('reject');


function myPromise(fn){
    let self = this;
    self.state = PENDING;
    self.value = null;
    self.reason = null;
    self.resolvedCallbacks = [];
    self.rejectCallbacks = [];

    function resolve(value){
        if(self.state == PENDING){
            self.state = RESOLVE;
            self.value = v;
            self.resolvedCallbacks.map(cb => cb(self.value));
        }

    }

    function reject(reason){
        if(self.state == PENDING){
            self.state = REJECT;
            self.reason = reason;
            self.rejectCallbacks.map(cb => cb(self.value));
        }
    }

    try{
        fn(resolve, reject);
    }catch(e){
        reject(e);
    }
}

myPromise.prototype.then = function(onFulfilled, onRejected){
    let self = this;

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected: r => r;

    if(self.state == PENDING){
        return new myPromise((resolve, reject) => {
            self.resolvedCallbacks.push(onFulfilled);
            self.rejectCallbacks.push(onRejected);
        })
    }

    if(self.state == RESOLVE){
        return new myPromise((resolve, reject) => {
            onFulfilled(self.value);
        })
    }

    if(self.state == REJECT){
        return new myPromise((resolve, reject) => {
            onRejected(self.reason);
        })
    }
}


myPromise.prototype.all = (arr) => {
    let result = [];
    return new Promise((resolve, reject) => {
        for (let i in arr) {
            if(arr[i] instanceof myPromise){
                arr[i].then((res) => {
                    result[i] = res;
                    if(result.length == arr.length) resolve(result);
                }, reject)
            }else{
                result[i] = arr[i];
            }
        }
    })
}

new myPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    },1000);
}).then((v) => {
    console.log(v);
}, (e) => {
    console.error(e);
});

const f = () => console.log('now');
let p = new Promise(resolve => resolve(f()));
p.then(res => console.log(res));
console.log('next');
// now


function convert_format(data){
    let temp = [];
    for (const object of data) {
        let obj = {};
        if(object['parent_ind']){
            obj[object['parent_ind']] = {};
            obj[object['parent_ind']][object['name']] = {};
        }else{
            obj[object['name']] = {};
        }
        temp.push(obj);
    }

    
}

industry_list = [
    {
       "parent_ind" : "女装",
       "name" : "连衣裙"
    },
    {
       "name": "女装"
    },
    {
       "parent_ind" : "女装",
       "name" : "半身裙"
    }
]

industry_list = [
    {
       "女装" :{
        "连衣裙" : {}
       }
    },
    {
        "女装" :{}
    },
    {
        "女装" :{       
        "半身裙" : {}
        }
    }
]