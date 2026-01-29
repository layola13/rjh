import React, { Component } from 'react';

interface ImageData {
  imgSrc: string | string[];
  url?: string;
  tip?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  bottomText?: string;
}

interface WalkthroughData {
  imgArr: ImageData[];
  clickEmptyClose?: boolean;
  slideTime?: number;
  autoSlide?: boolean;
  enableShowWelcome?: boolean;
  closeCallback?: () => void;
}

interface WalkthroughProps {
  data: WalkthroughData;
  className?: string;
}

interface WalkthroughState {
  currentIndex: number;
  transitionDuration: number;
}

interface TimerOptions {
  goRight?: boolean;
}

declare global {
  const HSApp: {
    App: {
      getApp(): {
        userTrackLogger: {
          push(event: string, data: any, options?: any): void;
        };
      };
    };
    Util: {
      Storage: new (type: string) => {
        get(key: string): any;
        set(key: string, value: string): void;
      };
      EventTrack: {
        instance(): {
          track(group: any, event: string, data: any): void;
        };
      };
      EventGroupEnum: {
        NewUserGuide: any;
      };
    };
  };
  const HSFPConstants: {
    PluginType: {
      Welcome: string;
    };
  };
  const ResourceManager: {
    getString(key: string): string;
  };
}

const DEFAULT_SLIDE_TIME = 3000;
const TRANSITION_DURATION = 0.3;
const SLIDE_WIDTH = 900;

export class Walkthrough extends Component<WalkthroughProps, WalkthroughState> {
  private totalImageNum: number = 1;
  private clickEmptyClose: boolean = false;
  private timer?: NodeJS.Timeout;
  private expired: boolean = false;
  private slideTime: number = DEFAULT_SLIDE_TIME;
  private autoSlide: boolean = false;
  private imgArrPlus: ImageData[] = [];
  private data: WalkthroughData;

  constructor(props: WalkthroughProps) {
    super(props);

    this.data = props.data;
    this.init(props.data);

    this.state = {
      currentIndex: this.totalImageNum > 1 ? 1 : 0,
      transitionDuration: TRANSITION_DURATION
    };

    this.setTimer();
  }

  private init(data: WalkthroughData): void {
    const { imgArr, clickEmptyClose, slideTime, autoSlide } = data;

    this.data = data;

    if (Array.isArray(imgArr) && imgArr.length > 1) {
      this.totalImageNum = imgArr.length + 2;
      this.imgArrPlus = [imgArr[imgArr.length - 1], ...imgArr, imgArr[0]];
    } else if (Array.isArray(imgArr)) {
      this.imgArrPlus = imgArr;
      this.totalImageNum = 1;
    }

    if (clickEmptyClose !== undefined) {
      this.clickEmptyClose = clickEmptyClose;
    }

    this.slideTime = slideTime !== undefined ? slideTime : DEFAULT_SLIDE_TIME;
    this.autoSlide = autoSlide !== undefined && autoSlide;
  }

  componentDidMount(): void {
    HSApp.App.getApp().userTrackLogger.push('welcome.walkthrough', {
      activeSection: 'walkthrough',
      activeSectionName: 'welcome-walkthrough',
      description: '进入欢迎页面walkthrough',
      clicksRatio: {
        id: 'welcomeWalkthrough',
        name: '进入欢迎页面walkthrough'
      }
    }, {
      triggerType: 'start'
    });
  }

  private setTimer(options?: TimerOptions): void {
    this.clearTimer();

    let goRight = true;
    if (options?.goRight !== undefined) {
      goRight = options.goRight;
    }

    if (this.autoSlide !== false && this.totalImageNum !== 1) {
      this.timer = setInterval(() => {
        goRight ? this.goRight() : this.goLeft();
      }, this.slideTime);
    }
  }

  private clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: WalkthroughProps): void {
    this.init(nextProps.data);
    this.setState({
      currentIndex: this.totalImageNum > 1 ? 1 : 0
    });
    this.setTimer(nextProps.data);
  }

  componentWillUnmount(): void {
    this.clearTimer();
  }

  private goLeft(): void {
    this.clearTimer();

    let goRight = true;
    const currentIndex = this.state.currentIndex;

    if (currentIndex <= 0) {
      this.slideTime = 0;
      goRight = false;
      this.setState({
        currentIndex: this.totalImageNum - 2,
        transitionDuration: 0
      });
    } else {
      const data = this.data;
      if (data?.slideTime !== undefined) {
        this.slideTime = data.slideTime;
      }
      this.setState({
        currentIndex: currentIndex - 1,
        transitionDuration: TRANSITION_DURATION
      });
    }

    this.setTimer({ goRight });
  }

  private goRightEventTrack(): void {
    HSApp.App.getApp().userTrackLogger.push('welcome.walkthrough.nextPage', {
      activeSection: 'walkthrough',
      activeSectionName: 'welcome-walkthrough',
      description: '欢迎页面walkthrough, 点击下一页',
      clicksRatio: {
        id: 'walkthroughNextPage',
        name: '进入欢迎页面walkthrough, 点击下一页'
      }
    }, undefined);
  }

  private goRight(): void {
    this.clearTimer();

    const currentIndex = this.state.currentIndex;

    if (currentIndex >= this.totalImageNum - 1) {
      this.slideTime = 0;
      this.setState({
        currentIndex: 1,
        transitionDuration: 0
      });
    } else {
      const data = this.data;
      if (data?.slideTime !== undefined) {
        this.slideTime = data.slideTime;
      }
      this.setState({
        currentIndex: currentIndex + 1,
        transitionDuration: TRANSITION_DURATION
      });
    }

    this.setTimer({ goRight: true });
    this.goRightEventTrack();
  }

  private barHover(index: number): void {
    this.clearTimer();
    this.setState({
      currentIndex: index
    });
  }

  private closePopup(): void {
    this.clearTimer();

    const welcomeDiv = document.querySelector('#welcomediv');
    if (welcomeDiv) {
      welcomeDiv.classList.remove('show-walkthrough');
    }

    const containers = document.getElementsByClassName('walkthrough-container');
    if (containers?.length) {
      for (let i = 0; i < containers.length; i++) {
        const container = containers.item(i);
        if (container) {
          container.classList.add('hide-walkthrough');
          if (this.props.data.enableShowWelcome) {
            container.classList.add('animate-hide');
          }
        }
      }
    }

    if (this.props.data.closeCallback) {
      this.props.data.closeCallback();
    }

    HSApp.App.getApp().userTrackLogger.push('welcome.walkthrough', {
      activeSection: 'walkthrough',
      activeSectionName: 'welcome-walkthrough',
      description: '关闭欢迎页面walkthrough',
      clicksRatio: {
        id: 'closeWelcomeWalkthrough',
        name: '关闭欢迎页面walkthrough'
      }
    }, {
      triggerType: 'end'
    });
  }

  private imageClick(url?: string): void {
    if (url !== undefined) {
      window.open(url, '_blank', 'noopener=yes, noreferrer=yes');

      const storage = new HSApp.Util.Storage(HSFPConstants.PluginType.Welcome);
      if (!storage.get('user-open-survey')) {
        storage.set('user-open-survey', 'true');
      }

      HSApp.Util.EventTrack.instance().track(
        HSApp.Util.EventGroupEnum.NewUserGuide,
        'walkthrough_open_new_tab_click_event',
        { sURL: url }
      );
    }
  }

  render(): React.ReactNode {
    if (this.expired === true || this.expired === 'true') {
      return null;
    }

    const { className, imgArr } = this.props.data;
    const { currentIndex, transitionDuration } = this.state;

    let popupClassName = 'walkthrough-popup ';
    if (className !== undefined) {
      popupClassName += className;
    }

    const sliderStyle: React.CSSProperties = {
      transform: `translate(-${SLIDE_WIDTH * currentIndex}px, 0px)`,
      transitionDuration: `${transitionDuration}s`,
      width: `${100 * this.totalImageNum}%`
    };

    const slideElements: JSX.Element[] = [];
    const barElements: JSX.Element[] = [];

    for (let i = 0; i < this.totalImageNum; i++) {
      const imageData = this.imgArrPlus[i];
      const {
        imgSrc,
        url,
        tip,
        title,
        description,
        buttonText,
        textColor = 'white',
        buttonColor,
        buttonTextColor,
        bottomText
      } = imageData;

      let hoverClass = '';
      if (url) {
        hoverClass = ' slideImageHover';
      }

      const imageSources = Array.isArray(imgSrc) ? imgSrc : [imgSrc];

      slideElements.push(
        <div
          key={i}
          className={`slider-images slider-images${i}${hoverClass}`}
          onClick={() => this.imageClick(url)}
        >
          <div className={`image-content ${bottomText ? 'function-interview' : ''}`}>
            <img
              className={`slideImage slideImage${i}`}
              src={imageSources[0]}
              alt=""
            />
            {imageSources[1] && (
              <img className="slide-image-gif" src={imageSources[1]} alt="" />
            )}
            <div className="text-in-image-wrapper">
              <div className="text-in-image" style={{ color: textColor }}>
                {tip && <div className="little-tip">{tip}</div>}
                {title && <div className="title">{title}</div>}
                {description && <div className="description">{description}</div>}
                {buttonText && (
                  <div
                    className="button"
                    style={{ background: buttonColor, color: buttonTextColor }}
                  >
                    <div className="text">{buttonText}</div>
                    <IconfontView
                      showType="hs_xian_go"
                      customStyle={{ fontSize: '20px', color: buttonTextColor }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="bottom">{bottomText}</div>
          </div>
        </div>
      );
    }

    let activeBarIndex = currentIndex - 1;
    if (this.totalImageNum > 1) {
      if (currentIndex >= this.totalImageNum - 1 || currentIndex === 1) {
        activeBarIndex = 0;
      } else if (currentIndex === 0 || currentIndex === this.totalImageNum - 2) {
        activeBarIndex = this.totalImageNum - 3;
      }
    }

    const barCount = imgArr.length;
    for (let i = 0; i < barCount; i++) {
      barElements.push(
        <div
          key={i}
          onMouseEnter={() => this.barHover(i + 1)}
          onMouseLeave={() => this.setTimer()}
          className={`bar bar${i}${activeBarIndex === i ? ' current' : ''}`}
        />
      );
    }

    return (
      <div className={popupClassName}>
        <div className="walkthrough-content">
          <div className="walkthrough-wrapper">
            <div className="image-wrapper" style={sliderStyle}>
              {slideElements}
            </div>
          </div>
          {this.totalImageNum === 1 ? null : (
            <div className="walkthrough-arrows">
              <div className="left-arrow arrow" onClick={() => this.goLeft()}>
                <Icons type="hs_xiao_danjiantou_zuo" />
              </div>
              <div className="right-arrow arrow" onClick={() => this.goRight()}>
                <Icons type="hs_xiao_danjiantou_you" />
              </div>
            </div>
          )}
          {this.totalImageNum === 1 ? null : (
            <div className="walkthrough-navigation">{barElements}</div>
          )}
        </div>
        <div className="walkthrough-close-area" onClick={() => this.closePopup()}>
          <div className="walkthrough-close-wrapper">
            <div className="walkthrough-close-text">
              {ResourceManager.getString('plugin_welcome_jump_over')}
            </div>
            <Icons type="hs_xiao_shuangjiantou_xia" />
          </div>
        </div>
      </div>
    );
  }
}

interface IconsProps {
  type: string;
}

const Icons: React.FC<IconsProps> = ({ type }) => {
  return <span className={`icon ${type}`} />;
};

interface IconfontViewProps {
  showType: string;
  customStyle?: React.CSSProperties;
}

const IconfontView: React.FC<IconfontViewProps> = ({ showType, customStyle }) => {
  return <span className={`iconfont ${showType}`} style={customStyle} />;
};