function initPage(jsonPath, callback){
    console.log("正在加载：",jsonPath);
    fetch(jsonPath)
    .then(res=>{
        if(!res.ok){
            throw new Error(`HTTP ${res.status} 文件找不到:${jsonPath}`);
        }
        return res.json();
    })
    .then(data=>{
        callback(data);
    })
    .catch(err=>{
        console.error("加载json失败",err);
        document.body.innerHTML += `<div style="color:red;padding:20px">数据加载异常：${err.message}</div>`;
    })
}
