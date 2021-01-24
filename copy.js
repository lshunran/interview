// 实现深拷贝
function deepCopy(obj){
    let type = typeof obj; //TODO
    let copy;
    switch(type){
        case 'object':
            return copyObejct(obj, copy);
        case 'array':
            return copyArray(obj, copy);
        case 'function':
            return copyFunction(obj, copy);
        default:
            return obj;
    }

}

function copyObejct(obj, copy = {}){
    for(let [key, value] of Object.entries(obj)){
        copy[key] = deepCopy(value);
    }
    return copy;
}

function copyArray(obj, copy = []){
    for(let [key, value] of Object.entries(obj)){
        copy[key] = deepCopy(value);
    }
    return copy;
}

function copyFunction(obj, copy){
    copy = eval(obj.toString());
    copy.prototype = obj.prototype;
    return copy;
}