// 问： 实现js中的bind
// 方法一，只可绑定，不可传参
  Function.prototype.my_bind = function(context){
    let self = this;
    let args = [...arguments].slice(1);
    return () => {
      self.apply(context, args);
    }
  }

  
  function a(){
    console.log(this.name);
  }
  a();  // ''
  var b = {
    name: 'apple'
  };
  a.bind(b)(); // apple
  a.my_bind(b)(); // apple