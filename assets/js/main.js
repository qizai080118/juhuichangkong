// 创建全局加载遮罩
function createLoadingMask() {
    const mask = document.createElement('div');
    mask.className = 'loading-box';
    mask.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">页面加载中...</div>
    `;
    mask.id = "globalLoading";
    document.body.appendChild(mask);
}

// 隐藏加载遮罩
function hideLoading(){
    const mask = document.getElementById("globalLoading");
    if(mask) mask.classList.add("hide");
}

// 全局加载导航菜单
function loadGlobalNav(callback){
    fetch("data/global.json")
        .then(res=>res.json())
        .then(data=>{
            const navWrap = document.querySelector("#navbar-wrap");
            let menuHtml = "";
            data.navbar.menu.forEach(item=>{
                if(item.isButton){
                    menuHtml += `<a href="${item.link}" class="nav-btn-login">${item.name}</a>`
                }else{
                    menuHtml += `<a href="${item.link}">${item.name}</a>`
                }
            })
            navWrap.innerHTML = `
                <div class="navbar-logo">剧绘长空</div>
                <div class="nav-menu">${menuHtml}</div>
            `;
            callback();
        })
        .catch(err=>{
            console.error("导航数据加载失败",err);
            document.body.innerHTML += `<div class="error-tip">资源加载失败，请稍后刷新页面</div>`;
        })
}

// 统一页面初始化入口
function initPage(jsonPath, pageRenderFunc){
    createLoadingMask();
    loadGlobalNav(()=>{
        fetch(jsonPath)
            .then(resp=>resp.json())
            .then(json=>{
                pageRenderFunc(json);
                hideLoading();
            })
            .catch(err=>{
                hideLoading();
                console.error("页面数据加载失败：",err);
                document.querySelector(".page-container, #home-modules-wrap")?.insertAdjacentHTML("beforebegin",
                    `<div class="error-tip">页面数据加载异常，请检查网络或刷新重试</div>`);
            })
    })
}
