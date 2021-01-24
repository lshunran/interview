//问：实现es6中的flat方法
Array.prototype.myFlat = function(level) {
    let arr = this;

    if (level == 0) return arr;

    let currentLvel = 1;

    function _flat(arr, level) {
        return arr.reduce((acc, item) => {

            if (currentLvel < level && Array.isArray(item)) {
                currentLvel++;
                return acc.concat(_flat(item, level));
            } else {
                return acc.concat(item);
            }
        }, []);
    }

    return _flat(arr, level);

}

var a = [1, 2, [3, 4, [5, 6]]];

console.log(a.myFlat(2));