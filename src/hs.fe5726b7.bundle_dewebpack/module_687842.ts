interface MessageNoticeOptions {
  className: string;
  always: boolean;
  closable: boolean;
}

interface Message {
  notice(content: React.ReactElement, options: MessageNoticeOptions): void;
}

interface GoldlogQueueItem {
  action: string;
  arguments: [string, string, string];
}

interface WindowWithGio extends Window {
  gio?: (action: string, event: string) => void;
  goldlog_queue?: GoldlogQueueItem[];
}

declare const window: WindowWithGio;
declare const React: any;
declare const ReactDOM: any;
declare const ResourceManager: any;

type Tenant = 'fp' | string;

export default class BrowserChecker {
  private _isSupportWebP: boolean | undefined;
  public tenant: Tenant;

  constructor(tenant: Tenant) {
    this._isSupportWebP = undefined;
    this.tenant = tenant;
  }

  /**
   * Check if the current browser is supported and display warnings if necessary
   */
  public checkBrowser(): void {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isChrome = userAgent.indexOf('chrome') > 0;
    const isMetasr = userAgent.indexOf('metasr') > 0;
    const isSafari = userAgent.indexOf('safari') > 0;

    const isMobileDevice = /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent);

    if (isMobileDevice) {
      const { Message } = require('./message') as { Message: Message };
      Message.notice(
        React.createElement('div', null, ResourceManager.getString('check_browser_for_mobile')),
        {
          className: 'mobile-tips-message',
          always: true,
          closable: true
        }
      );
    } else if (!isSafari && !isChrome && isMetasr) {
      const BrowserReminderDialog = require('./BrowserReminderDialog').default;
      ReactDOM.render(
        React.createElement(BrowserReminderDialog, null),
        document.querySelector('.browserreminderdialog')
      );

      const gio = window.gio;
      if (gio) {
        gio('track', 'eCheckBrowserFailure');
      }

      const goldlogQueue = window.goldlog_queue ?? (window.goldlog_queue = []);
      let logPath = '/hs_domestic_web.3d.';
      
      if (this.tenant === 'fp') {
        logPath = '/hs_global_web.3d.';
      }

      goldlogQueue.push({
        action: 'goldlog.record',
        arguments: [`${logPath}eCheckBrowserFailure`, 'CLK', 'GET']
      });
    }
  }

  /**
   * Check if the browser supports WebP image format
   */
  public isSupportWebP(): boolean {
    if (this._isSupportWebP === undefined) {
      const canvas = document.createElement('canvas');
      const webpDataUrl = canvas.toDataURL('image/webp', 1);
      this._isSupportWebP = webpDataUrl.indexOf('data:image/webp') === 0;
    }
    
    return this._isSupportWebP;
  }
}