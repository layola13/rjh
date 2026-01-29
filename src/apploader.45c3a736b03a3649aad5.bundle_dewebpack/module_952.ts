export default function renderLoginPage(container: HTMLElement): void {
  const imageUrl = `https://g.alicdn.com/tpsjj/homestyler-sso-assets/image/loginillustration.jpg?t=${Date.now()}`;
  
  const htmlTemplate = `<div id="homestyler-body"> <div class="left"> <img class="left-bg" src="https://g.alicdn.com/tpsjj/homestyler-sso-assets/image/loginillustration.jpg" /> <a href="https://www.shejijia.com/design/3d" target="_blank" class="get-more-a"> <span class="get-more-span">了解更多</span> <img src=${imageUrl} class="get-more-img" /> </a> </div> <div class="right"> <div id="alibaba-login-iframe"> <div id="alibaba-login-iframe-loading"> </div> </div> </div> </div>`;
  
  container.innerHTML = htmlTemplate;
}