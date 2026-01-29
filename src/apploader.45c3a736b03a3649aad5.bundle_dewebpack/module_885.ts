interface CSSModule {
  id: string;
  toString(): string;
  push(args: [string, string, string]): void;
}

interface URLResource {
  href: string;
}

const stylerIconUrl: URLResource = { href: './assets/styler-icon.png' };
const stylerIconDarkUrl: URLResource = { href: './assets/styler-icon-dark.png' };

const cssContent = `
.global-loading .loading-badge-wrapper {
  position: absolute;
  top: 9px;
  right: -10px;
  transform: translateX(100%);
  display: flex;
  flex-direction: row;
}

.global-loading .load-container .loading-badge {
  display: none;
  box-sizing: border-box;
  height: 22px;
  line-height: 20px;
  margin-right: 6px;
  padding: 0 8px 0 6px;
  border: 1px solid #1c1c1c;
  border-radius: 12px 3px 12px 3px;
  font-size: 14px;
  font-family: AlibabaPuHuiTi-Medium !important;
}

.global-loading .load-container .loading-badge.styler::before {
  content: " ";
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  margin-top: -1.5px;
  margin-right: 2px;
  background: url(${stylerIconUrl.href}) no-repeat center / cover;
}

.global-loading .load-container .loading-badge.dark {
  background: #1c1c1c;
  color: #fff;
}

.global-loading .load-container .loading-badge.dark::before {
  content: " ";
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  margin-top: -2px;
  margin-right: 2px;
  background: url(${stylerIconDarkUrl.href}) no-repeat center / cover;
}

.member-ad-wrapper {
  position: relative;
  display: none;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 160px;
  border-radius: 10px;
  cursor: pointer;
}

#memberAdWrapper {
  height: 110px;
  padding: 25px 210px 25px 40px;
}

#adsenseWrapper .adsbygoogle {
  min-height: 110px;
  max-height: 160px;
}

@media screen and (max-height: 960px) {
  .member-ad-wrapper {
    margin-top: 40px;
  }
  
  .global-loading .member-ad-wrapper {
    margin-top: 160px;
  }
}

@media screen and (max-height: 720px) {
  .member-ad-wrapper {
    margin-top: 0px;
  }
  
  .global-loading .member-ad-wrapper {
    margin-top: 100px;
  }
}

.member-ad-text {
  margin: 0;
  padding: 0;
  line-height: 24px;
  font-size: 16px;
  font-family: AlibabaPuHuiTi-Medium !important;
  font-weight: 400;
}

.member-ad-btn {
  position: absolute;
  top: 50%;
  right: 30px;
  display: none;
  height: 36px;
  line-height: 36px;
  margin-top: -18px;
  padding: 0 18px;
  border-radius: 18px;
  background: #1c1c1c;
  color: #fff;
  font-size: 16px;
  font-family: AlibabaPuHuiTi-Medium !important;
  font-weight: 400;
  text-align: center;
}

.member-ad-wrapper .adsbygoogle {
  display: none;
}

.member-ad-wrapper .ads-close-btn {
  display: none;
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 12px;
  color: #33353b;
  border: 1px solid rgba(0, 0, 0, 0.7);
  padding: 0 8px;
  line-height: 20px;
  border-radius: 5px 5px 0 0;
}

.member-ad-wrapper .ads-close-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
`;

const styleModule: CSSModule = {
  id: 'module_885',
  toString(): string {
    return cssContent;
  },
  push(args: [string, string, string]): void {
    // CSS module push implementation
  }
};

export default styleModule;