//问：实现httpGet方法
// 0:未初始化。尚未调用open()方法
// 1:启动。已经调用open()方法，但尚未调用send()方法。
// 2:发送。已经调用了send()方法，但未接收到响应。
// 3:接收。已经接收到部分响应数据
// 4:完成。已经接收到全部响应数据，而且已经可以在客户端使用了。

function httpGet(url, query, timeWait) {
    let timeCount = new Promise((resolve, reject) => {
        setTimeout(resolve, timeWait);
    }).then(() => {
        throw new Error('timeout!');
    })

    return Promise.race([_httpGet(url, query), timeCount]);
}

function _httpGet(url, query) {
    return new Promise((resolve, reject) => {

        let finalUrl = url;
        if (query) finalUrl += _toGetParams(query);

        let ajax = new XMLHttpRequest();
        ajax.open("GET", finalUrl);
        ajax.send();
        ajax.onreadystatechange = function() {
            if (ajax.status === 200) {
                resolve(ajax.response);
            } else {
                reject('server internal error!');
            }
        }

    })

}

function _toGetParams(query) {
    let result = "?";
    for (let key of Object.keys(query)) {
        result += key + "=" + query[key] + "&";
    }
    return result.slice(0, -1);
}