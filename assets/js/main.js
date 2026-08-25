function initPage(jsonPath, callback){
    fetch(jsonPath)
    .then(res=>res.json())
    .then(data=>{
        callback(data);
    })
    .catch(err=>{
        console.error("加载json失败",err);
    })
}
