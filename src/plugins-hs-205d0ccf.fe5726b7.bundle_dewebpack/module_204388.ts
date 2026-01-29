import { Component, PureComponent, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

enum DocumentStatus {
  Public = 'public',
  Private = 'private',
  Readonly = 'readonly'
}

interface DocumentStatusInfo {
  short_text: string;
  text: string;
}

interface ShareCaseState {
  documentStatus: DocumentStatus;
  isCloseIconHover: boolean;
  currentUrl: string;
  userId?: string;
}

interface ShareCaseProps {}

interface App {
  designMetadata: {
    get(key: string): any;
    set(key: string, value: any): void;
    flush(): void;
  };
  errorLogger: {
    push(message: string, options: ErrorLogOptions): void;
  };
}

interface ErrorLogOptions {
  errorStack: Error;
  description: string;
  errorInfo: {
    info: any;
    path: {
      file: string;
      functionName: string;
    };
  };
}

interface QueryStrings {
  assetId?: string;
}

interface RadioChangeEvent {
  target: {
    value: DocumentStatus;
  };
}

const logger = log.logger('shareCaseUpdateDesign');

class ShareCaseUpdateDesign extends PureComponent<ShareCaseProps, ShareCaseState> {
  private app: App;
  private _documentStatusList: Map<DocumentStatus, DocumentStatusInfo>;
  private options: boolean;
  private documentStatus?: DocumentStatus;

  constructor(props: ShareCaseProps) {
    super(props);

    this.app = HSApp.App.getApp();
    const queryStrings: QueryStrings = HSApp.Util.Url.getQueryStrings();
    const assetId = queryStrings.assetId;

    const isFpTenant = HSApp.Config.TENANT === 'fp';
    const currentUrl = isFpTenant
      ? `${HSApp.PartnerConfig.USERCENTER_URL}/openShared?assetId=${assetId}`
      : window.location.href;

    this.state = {
      documentStatus: this.app.designMetadata.get('documentStatus'),
      isCloseIconHover: false,
      currentUrl
    };

    this._documentStatusList = new Map<DocumentStatus, DocumentStatusInfo>();
    this._documentStatusList.set(DocumentStatus.Public, {
      short_text: ResourceManager.getString('privacy_public_short'),
      text: ResourceManager.getString('privacy_public') + (isFpTenant ? '[Beta]' : '')
    });
    this._documentStatusList.set(DocumentStatus.Private, {
      short_text: ResourceManager.getString('privacy_private_short'),
      text: ResourceManager.getString('privacy_private')
    });

    this.options = PrivacyDropdown.getOptionsFromPartner();

    this.onSelect = this.onSelect.bind(this);
    this.copyButtonClick = this.copyButtonClick.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.handleCloseIconMouseOver = this.handleCloseIconMouseOver.bind(this);
    this.handleCloseIconMouseOut = this.handleCloseIconMouseOut.bind(this);
  }

  onSelect(event: RadioChangeEvent): void {
    const currentUserId = adskUser.guid || adskUser.uid;

    if (currentUserId && this.state.userId === currentUserId || this.documentStatus === undefined) {
      const newStatus = event.target.value;

      this.app.designMetadata.set('documentStatus', newStatus);
      this.app.designMetadata.flush();
      this.setState({ documentStatus: newStatus });

      const designId = this.app.designMetadata.get('designId');

      HSApp.Io.Request.Design.updateDesignByAssetId(designId, { status: newStatus })
        .catch((error: Error) => {
          logger.warning('Share case update failed!' + error);
        });
    }
  }

  handleCloseIconMouseOver(): void {
    this.setState({ isCloseIconHover: true });
  }

  handleCloseIconMouseOut(): void {
    this.setState({ isCloseIconHover: false });
  }

  closePopup(): void {
    try {
      const popupContainer = document.querySelector('.popupcontainer');
      if (popupContainer) {
        ReactDOM.unmountComponentAtNode(popupContainer);
      }
    } catch (error) {
      Util.logger.error(error);
      const errorMessage = '[Plugin Sharecase]: close popup error';

      this.app.errorLogger.push(errorMessage, {
        errorStack: new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: error,
          path: {
            file: 'homestyler-tools-web/web/plugin/sharecase/component/sharecaseview.js',
            functionName: 'closePopup()'
          }
        }
      });
    }
  }

  copyButtonClick(): void {
    const urlInput = document.querySelector('.share-case-content .url-input') as HTMLInputElement;
    if (urlInput) {
      urlInput.select();

      if (document.execCommand('Copy')) {
        if ((document as any).selection) {
          (document as any).selection.empty();
        } else if (window.getSelection) {
          window.getSelection()?.removeAllRanges();
        }

        const successMessage = ResourceManager.getString('copy_share_case_url_livehint');
        const COPY_SUCCESS_DURATION = 2000;

        LiveHint.show(successMessage, COPY_SUCCESS_DURATION, undefined, {
          canclose: false,
          status: 'completed'
        });
      }
    }

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Toolbar,
      'share_design_event',
      {
        sUID: adskUser.uid,
        designID: HSApp.Util.Url.getQueryStrings().assetId
      }
    );
  }

  handleLinkClick(): void {
    const eventName = adskUser.isEnterprise
      ? 'share_design_console_event'
      : 'share_design_upgrade_event';

    HSApp.Util.EventTrack.instance().track(HSApp.Util.EventGroupEnum.Toolbar, eventName);
  }

  render() {
    const { documentStatus: rawStatus, isCloseIconHover } = this.state;

    let documentStatus = rawStatus !== undefined
      ? (rawStatus === DocumentStatus.Readonly ? DocumentStatus.Private : rawStatus)
      : DocumentStatus.Public;

    const radioOptions: JSX.Element[] = [];

    this._documentStatusList.forEach((statusInfo, status) => {
      if (this.options || status !== DocumentStatus.Readonly) {
        radioOptions.push(
          <Radio
            key={status}
            value={status}
            className={documentStatus === status ? 'span-color-selected' : ''}
          >
            {statusInfo.text}
          </Radio>
        );
      }
    });

    const myWorkbenchUrl = HSApp.PartnerConfig.MY_WORKBENCH_URL;
    const upgradeUrl = adskUser.isEnterprise
      ? myWorkbenchUrl?.team
      : HSApp.Config.MEMBER_GRADE_DETAIL;

    const isFpTenant = HSApp.Config.TENANT === 'fp';

    return (
      <div className="share-case-page">
        <div className="share-case-overlay" />
        <div className="share-case-content">
          <div className="header">
            <span className="title">
              {ResourceManager.getString('toolBar_share_case_title')}
            </span>
            <span
              className="closeBtn"
              onClick={this.closePopup}
              onMouseOver={this.handleCloseIconMouseOver}
              onMouseOut={this.handleCloseIconMouseOut}
            >
              <img
                className={isCloseIconHover ? 'hover-image' : 'close-image'}
                src={require('./close-icon.png')}
              />
              <img
                className={isCloseIconHover ? 'close-image' : 'hover-image'}
                src={require('./close-icon-hover.png')}
              />
            </span>
          </div>

          <div className="checkbox">
            <RadioGroup
              value={documentStatus}
              defaultValue="1"
              onChange={this.onSelect}
            >
              {radioOptions}
            </RadioGroup>
          </div>

          <div className="share-url-area">
            <input
              className="url-input"
              readOnly
              value={this.state.currentUrl}
            />
            <span className="copy-span" onClick={this.copyButtonClick}>
              {ResourceManager.getString('copy_share_case_button_tip')}
            </span>
          </div>

          {isFpTenant && (
            <p className="share-tips">
              {ResourceManager.getString(
                adskUser.isEnterprise
                  ? 'toolBar_share_case_ea_tips'
                  : 'toolBar_share_case_tips_prev'
              )}
              <a
                href={`${upgradeUrl}?source_page=3d_share_project`}
                onClick={this.handleLinkClick}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ResourceManager.getString(
                  adskUser.isEnterprise
                    ? 'toolBar_share_case_go_ea'
                    : 'toolBar_share_case_go_upgrade'
                )}
              </a>
              {!adskUser.isEnterprise &&
                ResourceManager.getString('toolBar_share_case_tips_next')}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default ShareCaseUpdateDesign;