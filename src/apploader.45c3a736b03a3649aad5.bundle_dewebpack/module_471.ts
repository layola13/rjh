interface BizConfig {
  biz: 'global' | 'ou';
}

interface AdskUser {
  memberId: string;
  uid: string;
}

interface UserInfo {
  memberId?: string;
  uid?: string;
  source?: string;
  clientVersion?: string;
  publishVersion?: string;
  environment?: string;
  envDomain?: string;
  channelCode?: string;
  refer_from_url?: string;
  [key: string]: string | undefined;
}

interface QueryStrings {
  webClient?: string;
  clientVersion?: string;
  channelCode?: string;
  env?: string;
  [key: string]: string | undefined;
}

interface GoldlogAction {
  action: string;
  arguments: unknown[];
}

interface WindowWithGoldlog extends Window {
  goldlog_queue?: GoldlogAction[];
  publishVersion?: string;
}

declare const window: WindowWithGoldlog;

class AnalyticsTracker {
  private biz: 'global' | 'ou';
  private userInfo: UserInfo;
  private adskUser: AdskUser;

  constructor(config: BizConfig) {
    this.biz = config.biz;
    this.userInfo = {};
    this.adskUser = {
      memberId: '',
      uid: ''
    };
  }

  start(): void {
    this.initializeAplusTracking(document);
    
    if (this.biz === 'global') {
      createHSInfo();
    }
  }

  private initializeAplusTracking(doc: Document): void {
    const metaIfrPv = doc.createElement('meta');
    metaIfrPv.name = 'aplus-ifr-pv';
    metaIfrPv.content = '1';
    doc.head.appendChild(metaIfrPv);

    const metaWaiting = doc.createElement('meta');
    metaWaiting.name = 'aplus-waiting';
    metaWaiting.content = 'MAN';
    doc.head.appendChild(metaWaiting);

    const metaSpmId = doc.createElement('meta');
    metaSpmId.name = 'spm-id';
    metaSpmId.content = 'a214ky.13184254';

    const script = doc.createElement('script');
    script.type = 'text/javascript';
    script.id = 'beacon-aplus';
    script.src = '//g.alicdn.com/alilog/mlog/aplus_v2.js';

    let exparam = 'ou';

    if (this.biz === 'global') {
      script.src = '//laz-g-cdn.alicdn.com/alilog/mlog/aplus_int.js';
      exparam = 'int';
      metaSpmId.content = 'a1zmxy.20315410';
    }

    doc.head.appendChild(metaSpmId);
    script.setAttribute('exparams', `clog=${exparam}&aplus&sidx=aplusSidx&ckx=aplusCkx`);
    script.async = true;
    script.defer = true;

    const firstChild = doc.body.firstChild;
    doc.body.insertBefore(script, firstChild);
  }

  sendPV(): void {
    this.getUserInfo();
    
    const queue = window.goldlog_queue ?? [];
    window.goldlog_queue = queue;
    
    queue.push({
      action: 'goldlog.sendPV',
      arguments: [
        {},
        {
          ...this.userInfo,
          refer_from_url: window.document.referrer
        }
      ]
    });
  }

  setAdskUser(user: AdskUser & { umsId: string }): void {
    this.adskUser = {
      memberId: user.memberId,
      uid: user.umsId
    };
    this.getUserInfo();
  }

  private getUserInfo(): void {
    let source = 'Web';
    const queryStrings = getQueryStringsFromUrl(location.search);
    const { webClient, clientVersion = '', channelCode, env } = queryStrings;

    if (webClient) {
      source = webClient === 'win' ? 'WindowsClient' : 'MacClient';
    }

    if (this.biz === 'global') {
      const hsInfo = getHSInfo();
      this.userInfo = {
        memberId: this.adskUser.uid,
        uid: this.adskUser.uid,
        source,
        clientVersion,
        publishVersion: window.publishVersion,
        environment: '设计家',
        ...hsInfo
      };
    } else {
      this.userInfo = {
        memberId: this.adskUser.memberId,
        uid: this.adskUser.uid,
        source,
        clientVersion,
        environment: '设计家',
        envDomain: env ?? '',
        publishVersion: window.publishVersion
      };
    }

    if (channelCode) {
      Object.assign(this.userInfo, { channelCode });
    }
  }

  sendUV(eventName: string, customParams: Record<string, string> = {}): void {
    const mergedParams = { ...this.userInfo, ...customParams };
    const paramPairs: string[] = [];

    for (const [key, value] of Object.entries(mergedParams)) {
      paramPairs.push(`${key}=${value}`);
    }

    const paramString = paramPairs.join('&');
    const queue = window.goldlog_queue ?? [];
    window.goldlog_queue = queue;

    const pathPrefix = this.biz === 'global' 
      ? '/hs_global_web.3d.' 
      : '/hs_domestic_web.3d.';

    queue.push({
      action: 'goldlog.record',
      arguments: [pathPrefix + eventName, 'CLK', paramString, 'GET']
    });
  }
}

function getQueryStringsFromUrl(search: string): QueryStrings {
  // Implementation from module 734
  const params: QueryStrings = {};
  const urlParams = new URLSearchParams(search);
  urlParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

function createHSInfo(): void {
  // Implementation from module 734
}

function getHSInfo(): Record<string, string> {
  // Implementation from module 734
  return {};
}

export default AnalyticsTracker;