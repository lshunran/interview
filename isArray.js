// 实现原生js中的isArray和isObject
function myIsArray(arr){
    return Object.prototype.toString.call(arr) === '[Obejct Array]';
}

function myIsObject(obj) {
    return obj != null && typeof obj === 'object' && Array.isArray(obj) === false;
}