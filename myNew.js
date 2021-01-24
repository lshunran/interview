// 问：编程实现new，并说明思路
function myNew(){

    //获取构造函数
    let Constructor = [].shift.call(arguments);

    //建立新对象然后绑定原型链
    let obj = Object.create(Constructor.prototype);

    //绑定this
    let result = Constructor.apply(obj, arguments);

    //返回新实例
    return typeof result === 'object' ? object : obj;
}
