// 问： 实现js中的call
Function.prototype.myCall = function(context){
    if(typeof this !== 'function') throw new TypeError('Error')

    context = context || window;

    context.fn = this;

    const args = [...this.arguments].slice(1);

    const result = context.fn(...args);

    delete context.fn;

    return result;
}


var sum = function(a){
    return (b) => {
        return (c) =>{
            return a+b+c;
        }
    }
}