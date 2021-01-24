//算法题：找出两个字符串中相同最长的子串
function findCommon(s1, s2){
    if(!s1 || !s2) return '';

    let result = '';
    let shortStr = s1.length > s2.length ? s2 : s1;
    let longStr = s1.length < s2.length ? s2 : s1;

    let shortLength = shortStr.length;


    while(shortLength > 0){
        for(let i = 0 ; i <= shortStr.length - shortLength; i++){
             let doubtStr = shortStr.substr(i, shortLength);

             if(longStr.indexOf(doubtStr) > -1) return doubtStr;
        }
        shortLength--;
    }

    return '';
}