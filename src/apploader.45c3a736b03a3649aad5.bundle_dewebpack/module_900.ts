interface LoginPopupOptions {
  container: HTMLElement;
  loginUrl?: string;
}

/**
 * 创建登录弹窗
 * @param container - 弹窗容器元素
 * @param loginUrl - 登录URL，如果提供则显示登录按钮，否则显示提示信息
 */
export default function createLoginPopup(container: HTMLElement, loginUrl?: string): void {
  const LOGIN_WINDOW_WIDTH = 1120;
  const LOGIN_WINDOW_HEIGHT = 620;
  const DEFAULT_LEFT_OFFSET = 175;
  const DEFAULT_TOP_OFFSET = 150;

  let template: string;

  if (loginUrl) {
    template = `<div id="logining-popup">
 <div id="main">
 <div class="left">
 <img class="left-bg" src="https://g.alicdn.com/tpsjj/homestyler-sso-assets/image/loginillustration.jpg" />
 <a href="https://www.shejijia.com/design/3d" target="_blank" class="get-more-a">
 <span class="get-more-span">了解更多</span>
 <img src="https://3d-assets.shejijia.com/v2/image/more-right.png" class="get-more-img">
 </a>
 </div>
 <div class="right">
 <div class="title">欢迎来到居然设计家</div>
 <button class="taobao-loginBtn">
 工作台帐号登录
 </button>
 </div>
 </div>
 </div>`;
  } else {
    template = `<div id="logining-popup-tip">
 <div id="main">
 <div class="img">
 <img src="https://dev.g.alicdn.com/tpsjj/homestyler-sso-assets/image/redirect.svg" />
 </div>
 <div class="content">
 <div>Oops! 您进入了一片未知领域</div>
 <div>请回到自己的工作台，重新进入3D编辑工具哦</div>
 </div>
 </div>
 </div>`;
  }

  container.innerHTML = template;

  if (loginUrl) {
    const loginButton = document.querySelector<HTMLButtonElement>(".taobao-loginBtn");
    loginButton?.addEventListener("click", () => {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      let leftOffset = DEFAULT_LEFT_OFFSET;
      let topOffset = DEFAULT_TOP_OFFSET;

      if (screenWidth > LOGIN_WINDOW_WIDTH) {
        leftOffset = (screenWidth - LOGIN_WINDOW_WIDTH) / 2;
      }

      if (screenHeight > LOGIN_WINDOW_HEIGHT) {
        topOffset = (screenHeight - LOGIN_WINDOW_HEIGHT) / 2;
      }

      const windowFeatures = `width=${LOGIN_WINDOW_WIDTH}, 
 height=${LOGIN_WINDOW_HEIGHT}, 
 left=${leftOffset}, 
 top=${topOffset}, 
 toolbar=no, 
 menubar=no, 
 scrollbars=no, 
 resizable=no, 
 location=no, 
 status=no, 
 z-look=true`;

      window.open(loginUrl, "taobaoLoginWindow", windowFeatures);
    }, false);
  }
}