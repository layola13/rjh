import React from 'react';

interface InboxHintFrequency {
  code: string;
  value?: number;
}

interface InboxHint {
  startTime?: number;
  endTime?: number;
  titleMdsKey?: string;
  sourcePage?: string;
  frequency?: InboxHintFrequency[];
  createTime?: number;
  validityTime?: number;
  ltTimeAlterRemind?: number;
}

interface NotificationState {
  isLogin: boolean;
  unreadNum: number;
  inboxHint?: InboxHint;
  inboxHints: InboxHint[];
  alertTime: number;
  showPopover: boolean;
}

interface NotificationProps {
  isLogin: boolean;
  signalChanged?: HSCore.Util.Signal;
}

interface NewsUnreadResponse {
  data: {
    data: {
      event?: number;
      inboxHints?: InboxHint[];
    };
  };
  ret: string[];
}

interface NewsCommentResponse {
  data?: {
    totalCount?: number;
  };
}

class NotificationComponent extends React.Component<NotificationProps, NotificationState> {
  constructor(props: NotificationProps) {
    super(props);

    this.state = {
      isLogin: props.isLogin,
      unreadNum: 0,
      inboxHint: undefined,
      inboxHints: [],
      alertTime: 1,
      showPopover: false
    };

    if (props.signalChanged) {
      props.signalChanged.listen((event: { data: Partial<NotificationState> }) => {
        this.setState(event.data as NotificationState, () => {
          if (event.data?.isLogin) {
            this.getUnreadNum();
          }
        });
      });
    }
  }

  componentDidMount(): void {
    const queryStrings = HSApp.Util.Url.getQueryStrings();
    if (queryStrings.guide !== 'restart') {
      const POLLING_INTERVAL = 180000; // 3 minutes
      setInterval(() => {
        this.getUnreadNum();
      }, POLLING_INTERVAL);
    }
  }

  findInboxHint = (): void => {
    const { inboxHints } = this.state;
    
    if (!inboxHints?.length) {
      return;
    }

    const matchedHint = inboxHints.find((hint) => this.checkShowPopover(hint));

    this.setState({
      ...this.state,
      inboxHint: matchedHint,
      showPopover: !!matchedHint
    });

    if (matchedHint) {
      HSApp.Util.EventTrack.instance().track(
        HSApp.Util.EventGroupEnum.Pageheader,
        'notice_inboxbubble_expose_event',
        {
          source_page: matchedHint.sourcePage || matchedHint.titleMdsKey
        }
      );
    } else {
      this.setState({
        ...this.state,
        showPopover: false
      });
    }
  };

  checkShowPopover(hint: InboxHint): boolean {
    const {
      startTime = 0,
      endTime = 0,
      titleMdsKey,
      frequency,
      createTime,
      validityTime,
      ltTimeAlterRemind
    } = hint;

    const now = Date.now();
    let isValid = false;
    const isInTimeRange = now > startTime && now < endTime;

    if (validityTime && createTime) {
      const remainingTime = validityTime * 1000 - (now - createTime);
      
      if (remainingTime > 0) {
        isValid = true;
        
        if (ltTimeAlterRemind) {
          const alertDelay = remainingTime - ltTimeAlterRemind * 1000;
          
          if (alertDelay > 0) {
            setTimeout(() => {
              this.setState({
                inboxHint: hint,
                alertTime: 2,
                showPopover: true
              });
            }, alertDelay);
          }
        }
      }
    } else {
      isValid = isInTimeRange;
    }

    const DEFAULT_FREQUENCY_MINUTES = 1440;
    let frequencyMinutes = DEFAULT_FREQUENCY_MINUTES;

    if (frequency?.length) {
      const perMinuteFreq = frequency.find((f) => f.code === 'perMinute');
      frequencyMinutes = perMinuteFreq?.value || DEFAULT_FREQUENCY_MINUTES;
    }

    const storageKey = `${titleMdsKey || 'hs_inbox_hint'}_${adskUser.memberId}`;
    const lastShownTime = Number(localStorage.getItem(storageKey) || 0);
    const MILLISECONDS_PER_MINUTE = 60000;

    return isValid && now - lastShownTime >= frequencyMinutes * MILLISECONDS_PER_MINUTE;
  }

  async getUnreadNum(): Promise<void> {
    if (!this.state.isLogin) {
      return;
    }

    try {
      const response = await NWTK.mtop.News.getNewsUnreadnum({
        data: {
          channel: 'tool'
        }
      }) as NewsUnreadResponse;

      if (!response?.data || !response.ret[0].includes('SUCCESS')) {
        return;
      }

      const { event = 0, inboxHints } = response.data.data;

      const commentResponse = await NWTK.mtop.News.getNewComment({
        data: {
          category: 'ACTIVITY',
          clientInfo: JSON.stringify({
            platform: 'web',
            language: 'en_US'
          })
        }
      }) as NewsCommentResponse;

      const commentCount = commentResponse?.data?.totalCount || 0;
      const totalUnread = Number(commentCount + event) || 0;

      this.setState({
        ...this.state,
        inboxHints: inboxHints || [],
        unreadNum: totalUnread
      }, () => {
        this.findInboxHint();
      });
    } catch (error) {
      // Silent error handling
    }
  }

  handleClick(): void {
    this.setState({
      unreadNum: 0
    });

    window.open(
      HSApp.PartnerConfig.MESSAGECENTER_URL,
      '_blank',
      'noopener=yes, noreferrer=yes'
    );

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Pageheader,
      'notice_icon_clk_event'
    );
  }

  hidePopover(): void {
    const storageKey = `${this.state.inboxHint?.titleMdsKey || 'hs_inbox_hint'}_${adskUser.memberId}`;
    localStorage.setItem(storageKey, String(Date.now()));
    this.findInboxHint();
  }

  render(): React.ReactElement {
    const { unreadNum, inboxHint, showPopover, alertTime } = this.state;
    const MAX_DISPLAY_COUNT = 99;

    return (
      <div className="notification-content" onClick={() => this.handleClick()}>
        <Tooltip
          placement="bottom"
          overlayClassName="tooltip-notification"
          title={ResourceManager.getString('toolbar_messages')}
          color="dark"
        >
          <div>
            <IconfontView
              showType="hs_xian_xinxi"
              customStyle={{ fontSize: '20px' }}
              clickColor="#396EFE"
              customClass="notification-icons"
            />
          </div>
        </Tooltip>
        {!!unreadNum && (
          <span className="unrend-num">
            {unreadNum > MAX_DISPLAY_COUNT ? '99+' : unreadNum}
          </span>
        )}
        {!!inboxHint && showPopover && (
          <InboxHintPopover
            inboxHint={inboxHint}
            alertTime={alertTime}
            hidePopover={this.hidePopover.bind(this)}
          />
        )}
      </div>
    );
  }
}

class NotificationPlugin {
  order: number;
  signalChanged: HSCore.Util.Signal;
  private _signinPlugin: any;
  private _signalHook: HSCore.Util.SignalHook;

  constructor(target: unknown, plugins: Record<string, any>) {
    this.order = 950;
    this.signalChanged = new HSCore.Util.Signal(this);
    this._signinPlugin = plugins['hsw.plugin.signin.Plugin'];
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook.listen(
      this._signinPlugin.signals.signalSigninSucceeded,
      this.notifyStatusChanged
    );
  }

  notifyStatusChanged(event: unknown): void {
    this.signalChanged.dispatch({
      isLogin: adskUser.isLogin()
    });
  }

  getRenderItem(): React.ReactElement {
    return React.createElement(NotificationComponent, {
      isLogin: adskUser.isLogin(),
      signalChanged: this.signalChanged
    });
  }
}

export default function createNotificationPlugin(): typeof NotificationPlugin {
  return NotificationPlugin;
}