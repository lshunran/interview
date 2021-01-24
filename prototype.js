//问： 什么是js中的原型链？
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
  }
  Parent.prototype.getName = function () { return this.name; }
  
  function Child (name, age) {
    Parent.call(this, name);  
    this.age = age;
  }
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;

  //constructor其实没有什么用处，只是JavaScript语言设计的历史遗留物。由于constructor属性是可以变更的，所以未必真的指向对象的构造函数，只是一个提示。不过，从编程习惯上，我们应该尽量让对象的constructor指向其构造函数，以维持这个惯例。