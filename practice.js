//数组转换为树
function convertTree(arr, parentId = null){
    let result = [];

    arr.forEach(element => {
        if(element['parent_id'] == parentId){
            element['children']= convertTree(arr, element['id']);
            result.push(element);
        }
    });
    
    return result;
}

var arr = [
    {id: 4, parent_id: null},
    {id: 7, parent_id: 4},
    {id: 2, parent_id: 4},
    {id: 1, parent_id: 7},
    {id: 3, parent_id: 7}
]

function convertTree2(arr){
    let result = {};
    let tmp = {};

    arr.forEach(item => {
        if(!tmp[item.id]) {
            tmp[item.id] = item;
            tmp[item.id].children = [];
        }
        if(item.parent_id === null){
            result = tmp[item.id];
        }else if(!tmp[item.parent_id]){
            tmp[item.parent_id] = {
                id: item.parent_id,
                children : []
            };
        }

        if(tmp[item.parent_id]){
            tmp[item.parent_id].children.push(item);
        }
    })

    console.log(tmp);

    return result;
}