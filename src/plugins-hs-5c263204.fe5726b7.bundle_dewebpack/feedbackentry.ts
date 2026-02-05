import React from 'react';

interface FeedbackEntryProps {
  title?: string;
  surveyUrl?: string;
  onclicked: (event?: React.MouseEvent) => void;
}

interface FeedbackEntryState {
  isShowToolTip: boolean;
  canShowInUIStage: boolean;
  isShowFeedbackEntry: boolean;
  isHighSvg: boolean;
  canControl: boolean;
  isFeedbackHover: boolean;
}

interface FeedbackMenuItem {
  key: string;
  text: string;
  hide?: boolean;
  click: (event?: React.MouseEvent) => void;
}

declare const HSApp: any;
declare const ResourceManager: any;
declare const adskUser: any;
declare const $: any;
declare const _: any;

export class FeedbackEntry extends React.Component<FeedbackEntryProps, FeedbackEntryState> {
  private changePosition: () => void;
  private draggable: boolean;
  private callback?: (event: MouseEvent) => void;
  private refs: {
    feedbackEntry: HTMLDivElement;
  };

  constructor(props: FeedbackEntryProps) {
    super(props);

    this.state = {
      isShowToolTip: true,
      canShowInUIStage: true,
      isShowFeedbackEntry: true,
      isHighSvg: true,
      canControl: false,
      isFeedbackHover: false,
    };

    this.changePosition = _.debounce(this._changePosition.bind(this), 100);
    this.draggable = true;
    this.refs = {} as any;
  }

  private changeToolTipToShow = (show: boolean): void => {
    if (this.state.canControl) {
      this.setState({ isShowToolTip: show });
    }
  };

  private changeSvgToHigh = (isHigh: boolean): void => {
    if (this.state.canControl) {
      this.setState({ isHighSvg: isHigh });
    }
  };

  private handleCloseTooltip = (): void => {
    this.setState({
      canControl: true,
      isShowToolTip: false,
      isHighSvg: false,
    });
  };

  private hideFeedbackEntry = (event?: React.MouseEvent): void => {
    event?.stopPropagation();
    this.setState({ isShowFeedbackEntry: false });
  };

  private handleDragStart = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (this.draggable) {
      const startX = event.clientX;
      const startY = event.clientY;
      const initialLeft = this.refs.feedbackEntry.offsetLeft;
      const initialTop = this.refs.feedbackEntry.offsetTop;

      this.callback = (moveEvent: MouseEvent): void => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        this.refs.feedbackEntry.style.left = `${initialLeft + deltaX}px`;
        this.refs.feedbackEntry.style.top = `${initialTop + deltaY}px`;
        moveEvent.stopPropagation();
        moveEvent.preventDefault();
      };

      document.body.addEventListener('mousemove', this.callback);
      this.draggable = false;
    }
  };

  private handleDragEnd = (): void => {
    if (this.callback) {
      document.body.removeEventListener('mousemove', this.callback);
    }
    this.draggable = true;
  };

  private _changePosition(): void {
    const element = this.refs.feedbackEntry;
    const elementWidth = element.clientWidth ?? 0;
    const elementHeight = element.clientHeight ?? 0;
    const elementLeft = element.offsetLeft ?? 0;
    const elementTop = element.offsetTop ?? 0;
    const style = element.style ?? {};
    const bodyWidth = document.body.clientWidth ?? 0;
    const bodyHeight = document.body.clientHeight ?? 0;

    const rightOverflow = bodyWidth - elementWidth - elementLeft;
    const bottomOverflow = bodyHeight - elementHeight - elementTop;

    if (rightOverflow < 0) {
      style.left = `${bodyWidth - elementWidth - 20}px`;
    }

    if (bottomOverflow < 0) {
      style.top = `${bodyHeight - elementHeight - 20}px`;
    }
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.changePosition);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.changePosition);
  }

  setCanShowInUILevel(canShow: boolean): void {
    this.setState({ canShowInUIStage: canShow });
  }

  showFeedbackEntry(): void {
    this.setState({ isShowFeedbackEntry: true });
  }

  private toggleAliXiaomi(isFromToolbar: boolean = false): void {
    $('.alicare-dialog-customized').click();
    HSApp.App.getApp().userTrackLogger.push('help.xiaomi', {
      description: '家居设计小蜜',
      activeSectionName: isFromToolbar ? '工具栏' : '右下角反馈',
      activeSection: isFromToolbar
        ? HSApp.Util.EventGroupEnum.Toolbar
        : HSApp.Util.EventGroupEnum.Feedback,
      clicksRatio: {
        id: 'helpBar_xiaomi',
        name: ResourceManager.getString('toolbar_help_xiaomi'),
      },
    });
  }

  private onFeedBackEnter = (): void => {
    if (!this.state.isFeedbackHover) {
      this.setState({ isFeedbackHover: true });
    }
  };

  private onFeedBackLeave = (): void => {
    if (this.state.isFeedbackHover) {
      this.setState({ isFeedbackHover: false });
    }
  };

  render(): React.ReactNode {
    const hideClass = this.state.isShowFeedbackEntry ? '' : ' hide';

    if (!this.state.canShowInUIStage) {
      return null;
    }

    const isFpTenant = HSApp.Config.TENANT === 'fp';
    const shouldHideMenu = isFpTenant && !this.props.surveyUrl;

    const menuItems: FeedbackMenuItem[] = [
      {
        key: 'xiaomi',
        text: 'feedback_service',
        hide: isHXRR() || isFpTenant,
        click: () => this.toggleAliXiaomi(),
      },
      {
        key: 'survey',
        text: 'feedback_survey',
        hide: !this.props.surveyUrl,
        click: () => {
          window.open(
            `${this.props.surveyUrl}?uid=${adskUser.uid}`,
            '_blank',
            'noopener=yes, noreferrer=yes'
          );
        },
      },
      {
        key: 'feedback',
        text: 'plugin_feedback_name',
        click: (event) => this.props.onclicked(event),
      },
    ].filter((item) => !item.hide);

    return (
      <div className="feedback">
        <div
          ref="feedbackEntry"
          className={`feedback-entry${hideClass}`}
          onMouseDown={this.handleDragStart}
          onMouseUp={this.handleDragEnd}
        >
          <div className="feedback-icon">
            {isFpTenant ? (
              <Tooltip
                placement="top"
                title={ResourceManager.getString('plugin_feedback_name')}
                trigger="hover"
                color="dark"
              >
                <div>
                  <IconfontView
                    customClass="icon-feedback-close"
                    showType="hs_xiao_shanchu"
                    customStyle={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '10px',
                    }}
                    hoverColor="#fff"
                    clickColor="#fff"
                    iconOnclick={this.hideFeedbackEntry}
                  />
                  <IconfontView
                    showType="hs_zhanshi_feedback"
                    customStyle={{ fontSize: '44px' }}
                  />
                  <IconfontView
                    customClass="icon-feedback"
                    showType="hs_mian_moxingshenqing"
                    customStyle={{
                      color: '#fff',
                      fontSize: '20px',
                    }}
                    iconOnclick={(event: React.MouseEvent) => {
                      event.stopPropagation();
                      this.props.onclicked();
                    }}
                  />
                </div>
              </Tooltip>
            ) : (
              <IconfontView
                showType="hs_zhanshi_kefu"
                customStyle={{
                  color: '#1C1C1C',
                  fontSize: '36px',
                }}
                customBgStyle={{
                  background: 'rgba(28, 28, 28, 0.1)',
                }}
                hoverColor="#396EFE"
                clickColor="#396EFE"
                hoverBgColor="rgba(28, 28, 28, 0.1)"
                bgExtendSize={8}
              />
            )}
          </div>
          {!shouldHideMenu && (
            <ul className="feedback-btns">
              {menuItems.map((item, index) => (
                <React.Fragment key={item.key}>
                  {index > 0 && <hr className="feedback-divider" />}
                  <li className="feedback-item" onClick={item.click}>
                    {ResourceManager.getString(item.text)}
                  </li>
                </React.Fragment>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

function isHXRR(): boolean {
  return (window as any).isHXRR?.() ?? false;
}

interface TooltipProps {
  placement: string;
  title: string;
  trigger: string;
  color: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  return props.children as React.ReactElement;
};

interface IconfontViewProps {
  customClass?: string;
  showType: string;
  customStyle?: React.CSSProperties;
  customBgStyle?: React.CSSProperties;
  hoverColor?: string;
  clickColor?: string;
  hoverBgColor?: string;
  bgExtendSize?: number;
  iconOnclick?: (event: React.MouseEvent) => void;
}

const IconfontView: React.FC<IconfontViewProps> = (props) => {
  return <i className={props.customClass} onClick={props.iconOnclick} />;
};