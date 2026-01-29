import DOMPurify from './234';
import './132';
import renderEALogin from './900';
import renderIframeLogin from './653';
import config from './166';
import renderDefaultLogin from './952';
import { getQueryStringsFromUrl, addParams } from './734';

interface MessageData {
  action?: string;
  data?: {
    type?: string;
    status?: string;
    eType?: string;
  };
}

interface LoginOptions {
  targetId: string;
  iframeUrl: string;
  lang: string;
  appName: string;
  appEntrance: string;
  notLoadSsoView: string;
  notKeepLogin: boolean;
  isMobile: boolean;
  iframeWidth: string;
  showSnsLogin: boolean;
  queryStr: string;
}

interface MiniLoginEmbedder {
  init(options: LoginOptions): void;
  addEvent(eventName: string, callback: (data: MessageData) => void): void;
}

interface WindowWithEmbedder extends Window {
  MiniLoginEmbedder: new () => MiniLoginEmbedder;
}

declare const window: WindowWithEmbedder;

export function loginMessageListener(loginType: string): (message: MessageData) => void {
  return (message: MessageData): void => {
    const platformTypes: string[] = loginType === 'ea' 
      ? Object.keys(config.PLATFORM_LOGIN_URL) 
      : [];

    const hasLoginAction = message.action && 
      (message.action === 'hasLoginResult' || message.action === 'loginResult');
    
    const isEALoginSuccess = loginType === 'ea' && 
      message.data && 
      platformTypes.includes(message.data.type ?? '') && 
      message.data.status === 'loginSuccess';
    
    const isGlobalLoginSuccess = loginType === 'global' && 
      message.data && 
      message.data.eType === 'logInSuccess';

    if (hasLoginAction || isEALoginSuccess || isGlobalLoginSuccess) {
      const loginRootElement = document.querySelector<HTMLElement>('#login-root-dom');
      
      if (loginRootElement) {
        document.body.removeChild(loginRootElement);
      }

      if (window.self === window.top) {
        window.location.reload();
      } else {
        window.parent.location.reload();
      }
    }
  };
}

export default function initLogin(loginType: string, platformType?: string): void {
  const loadingSvg = document.querySelector<HTMLElement>('.loadingsvg');
  if (loadingSvg) {
    loadingSvg.hidden = true;
  }

  const loginRootElement = document.createElement('div');
  loginRootElement.id = 'login-root-dom';
  document.body.append(loginRootElement);

  if (loginType === 'global') {
    const queryParams = getQueryStringsFromUrl(location.search);
    const webClient = queryParams.webClient 
      ? DOMPurify.escapeHtml(queryParams.webClient) 
      : '';
    
    let loginUrl = `${config.PASSPORT_SERVER}login.html?noNeedTryLogin=true`;
    
    if (webClient) {
      loginUrl += `&webClient=${webClient}`;
    }
    
    renderIframeLogin(loginRootElement, loginUrl);
  } else if (loginType === 'ea' && platformType) {
    const platformLoginUrl = config.PLATFORM_LOGIN_URL[platformType];
    renderEALogin(loginRootElement, platformLoginUrl);
  } else {
    renderDefaultLogin(loginRootElement);
  }

  const messageListener = loginMessageListener(loginType);

  if (loginType === 'homestyler') {
    const iframeUrl = `${config.IPASSPORT_SERVER}mini_login.htm`;
    const registerBaseUrl = `${config.PASSPORT_SERVER}register`;
    const encodedRedirectUri = encodeURIComponent(location.href);
    
    const registerUrl = addParams(registerBaseUrl, {
      platform: 'web',
      redirect_uri: encodedRedirectUri,
      app: 'web-3d'
    });
    
    const encodedRegisterUrl = encodeURIComponent(
      `${config.PASSPORT_SERVER}member/register?tg=${encodeURIComponent(registerUrl)}`
    );
    
    const loginOptions: LoginOptions = {
      targetId: 'alibaba-login-iframe',
      iframeUrl,
      lang: 'zh_cn',
      appName: 'shejijia',
      appEntrance: 'shejijia',
      notLoadSsoView: 'true',
      notKeepLogin: false,
      isMobile: false,
      iframeWidth: '350',
      showSnsLogin: false,
      queryStr: `&regUrl=${encodedRegisterUrl}&returnUrl=${encodedRedirectUri}`
    };

    const embedder = new window.MiniLoginEmbedder();
    embedder.init(loginOptions);
    embedder.addEvent('onMessage', (data: MessageData) => {
      messageListener(data);
    });
  } else {
    const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
    
    window[eventMethod](messageEvent, messageListener as EventListener, false);
  }
}