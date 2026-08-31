// JSONP加载，回调固定loadback
function loadJson(url, callback){
    window.loadback = function(data){
        callback(null, data);
    };
    const script = document.createElement('script');
    script.src = url;
    script.onerror = ()=>callback(new Error(`加载失败：${url}`), null);
    document.body.appendChild(script);
}
