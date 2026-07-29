// 数据缓存
const DATA_CACHE = {};

// 加载本地JSON
async function loadJson(jsonUrl) {
  if (DATA_CACHE[jsonUrl]) return DATA_CACHE[jsonUrl];
  const response = await fetch(jsonUrl);
  const jsonData = await response.json();
  DATA_CACHE[jsonUrl] = jsonData;
  return jsonData;
}

// 统一渲染顶部导航（全部页面共享）
async function renderNavbar() {
  const globalData = await loadJson("data/global.json");
  const navBox = document.querySelector("#navbar-container");
  let html = `
    <div class="nav-logo">剧绘长空</div>
    <div class="nav-menu">
  `;
  globalData.navbar.menu.forEach(menu => {
    if(menu.isButton){
      html += `<a href="${menu.link}" class="nav-btn-login">${menu.name}</a>`
    }else{
      html += `<a href="${menu.link}" class="nav-link">${menu.name}</a>`
    }
  })
  html += `</div>`;
  navBox.innerHTML = html;
}

// 页面初始化统一入口
async function initPage(jsonPath, renderFunc) {
  await renderNavbar();
  const pageData = await loadJson(jsonPath);
  renderFunc(pageData);
}
