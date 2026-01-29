import React from 'react';
import ReactDOM from 'react-dom';

interface QueryStrings {
  env?: string;
  taobaoId?: string;
  reenterurl?: string;
}

interface BrowserReminderDialogProps {}

interface BrowserReminderDialogState {}

export default class BrowserReminderDialog extends React.Component<
  BrowserReminderDialogProps,
  BrowserReminderDialogState
> {
  /**
   * Close the browser reminder dialog
   */
  close(): void {
    const dialogElement = document.querySelector('.browserreminderdialog');
    if (dialogElement) {
      ReactDOM.unmountComponentAtNode(dialogElement);
    }
  }

  /**
   * Open Chrome download page
   */
  downloadChrome(): void {
    window.open(
      'https://design.homestyler.com/cn/3d#download',
      '_blank',
      'noopener=yes, noreferrer=yes'
    );
  }

  /**
   * Open client download page
   */
  downloadClient(): void {
    window.open(
      'https://design.homestyler.com/cn/3dClient',
      '_blank',
      'noopener=yes, noreferrer=yes'
    );
  }

  render(): React.ReactElement {
    const queryStrings: QueryStrings = HSApp.Util.Url.getQueryStrings();
    const { env, taobaoId, reenterurl } = queryStrings;
    
    const isIhomeMode = !!(env && taobaoId && reenterurl);
    
    const reminderText = isIhomeMode
      ? ResourceManager.getString('check_browser_dialog_reminder_ihome')
      : ResourceManager.getString('check_browser_dialog_reminder');
    
    let chromeButtonClassName = 'button-download-chrome';
    if (isIhomeMode) {
      chromeButtonClassName += ' ihome';
    }
    
    const shouldShowClientButton = !isIhomeMode && HSApp.Config.TENANT !== 'fp';

    return (
      <div className="modal-browser-reminder">
        <div className="reminder-dialog">
          <div className="close" onClick={() => this.close()}>
            X
          </div>
          <div className="reminder-text-recommendation-font">
            {reminderText}
          </div>
          <div className="button-line">
            <div className={chromeButtonClassName} onClick={() => this.downloadChrome()}>
              {ResourceManager.getString('check_browser_download_chrome')}
            </div>
            {shouldShowClientButton && (
              <div className="button-download-client" onClick={() => this.downloadClient()}>
                {ResourceManager.getString('check_browser_download_client')}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}