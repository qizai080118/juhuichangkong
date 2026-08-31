// 动态script加载jsonp风格，不用fetch，保留回调
function loadData(jsonPath, callback) {
    window.loadCallback = function(data) {
        callback(null, data);
    };
    const script = document.createElement('script');
    script.src = jsonPath;
    script.onerror = function(){
        callback(new Error("文件加载失败 " + jsonPath), null);
    };
    document.body.appendChild(script);
}
