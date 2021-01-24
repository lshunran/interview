// 问：什么是promise A+规范，请简单实现一个

function Promise(excutor) {
  let self = this;
  self.status = "pending";
  self.value = null;
  self.reason = null;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.status === "pending") {
      self.value = value;
      self.status = "fulfilled";
      self.onFulfilledCallbacks.forEach((item) => item());
    }
  }

  function reject(reason) {
    if (self.status === "pending") {
      self.reason = reason;
      self.status = "rejected";
      self.onRejectedCallbacks.forEach((item) => item());
    }
  }
  try {
    excutor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function"
      ? onFulfilled
      : function (data) {
          resolve(data);
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (err) {
          throw err;
        };
  let self = this;
  if (self.status === "fulfilled") {
    return new Promise((resolve, reject) => {
      try {
        let x = onFulfilled(self.value);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
  if (self.status === "rejected") {
    return new Promise((resolve, reject) => {
      try {
        let x = onRejected(self.reason);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
  if (self.status === "pending") {
    return new Promise((resolve, reject) => {
      self.onFulfilledCallbacks.push(() => {
        let x = onFulfilled(self.value);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      });
      self.onRejectedCallbacks.push(() => {
        let x = onRejected(self.reason);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      });
    });
  }
};

Promise.prototype.catch = function (fn) {
  return this.then(null, fn);
};

Promise.prototype.all = (arr) => {
  let result = [];
  return new Promise((resolve, reject) => {
    for (var i in arr) {
      arr[i].then(
        (res) => {
          result[i] = res;
          if (result.length == arr.length) {
            resolve(result);
          }
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
};

Promise.prototype.race = (arr) => {
  return new Promise((resolve, reject) => {
    arr.forEach((item) => {
      item.then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};

function start(tasks) {
  var result = [];
  return tasks.reduce((accumulator, item, index) => {
  return accumulator.then(res => {
    result.push(res);
    return index == tasks.length - 1 ? item.then(res => { result.push(res); return result; }) : item;
  });
  }, Promise.resolve(0));
}

function delay(time) {
  return new Promise(function(resolve, reject) {
      setTimeout(function() {
          resolve(time);
      }, time);
  });
}

start([delay(3000), delay(2000), delay(1000)]).then(res => {
  console.log(res); // [0, 3000, 2000, 1000]
});

//finally
Promise.prototype.finally = function(cb) {
  cb = typeof cb === 'function' ? cb : function() {};
    
  var Fn = this.constructor;  // 获取当前实例构造函数的引用

  // 接受状态：返回数据
  var onFulfilled = function(data) {
    return Fn.resolve(cb()).then(function() {
      return data
    })
  };

  // 拒绝状态：抛出错误
  var onRejected = function(err) {
    return Fn.resolve(cb()).then(function() {
      throw err
    })
  };

  return this.then(onFulfilled, onRejected);
}



new Promise(function(resolve){
  console.log('outter 1');
  resolve();
}).then(function(){
  console.log('outter then 1');
  new Promise(function(resolve){
    console.log('inner promise 1');
    resolve();
  }).then(function(){
    console.log('inner then 1');
  }).then(function(){
    console.log('inner then 2');
  })
})
.then(function(){
  console.log('outter then 2');
})

// outter 1
// outter then 1
// inner promise 1
// inner then 1
// outter then 2
// inner then 2