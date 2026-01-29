import React from 'react';
import ReactDOM from 'react-dom';

interface CardViewerProps {
  viewertitle?: string;
  contents?: ContentItem[];
  position?: Position;
  skipmsg?: string;
  btntext?: string;
  actioncall?: () => void;
  keytype?: string;
  isfixedheight?: boolean;
  baseurl?: string;
}

interface Position {
  x: number;
  y: number;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

interface ContentItem {
  image?: string[];
  video?: string[];
  text?: string | string[];
}

interface CardViewerState {
  position: Position;
  buttonText?: string;
  buttonAction?: (() => void) | null;
  hover: boolean;
}

interface AnimationTarget {
  left: number;
  top: number;
  width: number;
  height: number;
}

declare global {
  const ResourceManager: {
    injectSVGImage: (selector: string) => void;
    getString: (key: string) => string;
  };
  const hsw: {
    plugin: {
      userguide: {
        cardTypeEnum: {
          workflow: string;
        };
      };
    };
  };
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

class CardViewer extends React.Component<CardViewerProps, CardViewerState> {
  private pageNum: number = 0;
  private total: number = 0;
  private refs: any;

  static defaultProps: Partial<CardViewerProps> = {
    skipmsg: '',
  };

  constructor(props: CardViewerProps) {
    super(props);
    this.state = {
      position: this.props.position || { x: 0, y: 0 },
      buttonText: this.props.btntext,
      buttonAction: this.props.actioncall,
      hover: false,
    };
  }

  private handleMouseEnter = (e: React.MouseEvent): void => {
    this.setState({ hover: true });
  };

  private handleMouseLeave = (): void => {
    if (this.state.hover) {
      this.setState({ hover: false });
    }
  };

  componentDidMount(): void {
    this.pageNum = 0;
    ResourceManager.injectSVGImage('.videoplaybtn');
  }

  componentDidUpdate(): void {
    ResourceManager.injectSVGImage('.videoplaybtn');
  }

  componentWillUnmount(): void {
    this.pageNum = 0;
    this.total = 0;
  }

  private skipAction = (): void => {
    // Signal dispatch removed as it's not standard React
    this.animationHide();
  };

  private close = (): void => {
    if (this.props.keytype !== hsw.plugin.userguide.cardTypeEnum.workflow) {
      this.closeComponent();
    } else {
      this.animationHide();
    }
  };

  private closeComponent = (): void => {
    try {
      const container = document.querySelector('.guidecontainer');
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
      }
    } catch (e) {
      // Silent catch
    }
  };

  private animationHide = (): void => {
    const helpButton = $('[data-toolbar-path="toolBar_help"]:visible').offset();
    
    if (helpButton) {
      let animationTarget: AnimationTarget = {
        left: helpButton.left + 5,
        top: helpButton.top + 5,
        width: 0,
        height: 0,
      };

      if (this.props.keytype !== hsw.plugin.userguide.cardTypeEnum.workflow) {
        const mountOffset = $(this.refs.mount).offset();
        $(this.refs.mount).css({
          left: mountOffset?.left ?? 0,
          top: mountOffset?.top ?? 0,
        });
      }

      $(this.refs.mount).animate(animationTarget, 800, () => {
        this.closeComponent();
      });
    }
  };

  private goToPage = (pageIndex: number): void => {
    if (isNaN(parseInt(String(pageIndex), 10))) return;

    this.pageNum = pageIndex;
    
    if (this.pageNum >= this.total || this.pageNum < 0) {
      this.pageNum = 0;
    }

    const contentContainer = $(ReactDOM.findDOMNode(this.refs.guidecontens) as Element);
    contentContainer.find('.pageitem').addClass('hidden');
    contentContainer.find('.pageitem').eq(pageIndex).removeClass('hidden');

    const paginationContainer = $(ReactDOM.findDOMNode(this.refs.pagination) as Element);
    paginationContainer.find('.paginationitem').removeClass('actived');
    paginationContainer.find('.paginationitem').eq(pageIndex).addClass('actived');

    if (pageIndex === this.total - 1) {
      this.setState({
        buttonText: this.props.btntext,
        buttonAction: this.props.actioncall,
      });
    } else {
      this.setState({
        buttonText: ResourceManager.getString('userguide_next'),
        buttonAction: this.goNextPage,
      });
    }
  };

  private goPrevPage = (): void => {
    if (isNaN(parseInt(String(this.pageNum), 10))) return;

    let prevPage = this.pageNum - 1;
    if (prevPage < 0) {
      prevPage = this.total - 1;
    }
    this.goToPage(prevPage);
  };

  private goNextPage = (): void => {
    if (isNaN(parseInt(String(this.pageNum), 10))) return;

    let nextPage = this.pageNum + 1;
    if (nextPage >= this.total) {
      nextPage = 0;
    }
    this.goToPage(nextPage);
  };

  private playVideo = (videoIndex: number): boolean => {
    const videoElement = document.querySelector(`.video-${videoIndex} video`) as HTMLVideoElement;
    
    if (!videoElement) return false;

    videoElement.onended = () => {
      $(this.refs[`playbtton${videoIndex}`]).show();
    };

    videoElement.onplay = () => {
      $(this.refs[`playbtton${videoIndex}`]).hide();
    };

    if (videoElement.paused) {
      videoElement.play();
      $(this.refs[`playbtton${videoIndex}`]).hide();
    } else {
      videoElement.pause();
      $(this.refs[`playbtton${videoIndex}`]).show();
    }

    return false;
  };

  private breakLine = (text: string): (string | JSX.Element)[] => {
    const breakLineRegex = /(<br \/>)/g;
    return text.split(breakLineRegex).map((segment, index) => {
      return segment.match(breakLineRegex) ? <br key={index} /> : segment;
    });
  };

  private isFullUrl = (url: string): boolean => {
    return url.indexOf('http://') > -1 || url.indexOf('https://') > -1;
  };

  private handleButtonMouseOver = (): void => {
    // Placeholder for mouse over handler
  };

  private handleButtonMouseOut = (): void => {
    // Placeholder for mouse out handler
  };

  render(): JSX.Element {
    const currentPage = this.pageNum || 0;
    const { viewertitle, contents, isfixedheight, baseurl } = this.props;
    const heightClass = isfixedheight ? ' fixedheight' : '';
    const positionStyle = this.state.position;

    const contentElements: JSX.Element[] = [];
    const paginationElements: JSX.Element[] = [];

    if (contents?.length) {
      const firstContent = contents[0];
      const pageItems: JSX.Element[] = [];

      if (firstContent.image && Array.isArray(firstContent.image)) {
        this.total = firstContent.image.length;
        firstContent.image.forEach((imageSrc, index) => {
          const isActive = currentPage === index;
          const hiddenClass = isActive ? '' : ' hidden';
          const fullImageUrl = this.isFullUrl(imageSrc) ? imageSrc : (baseurl ?? '') + imageSrc;

          pageItems.push(
            <div key={`imgs-${index}`} className={`pageitem imgctn${hiddenClass}`}>
              <img src={fullImageUrl} className="pimg" />
            </div>
          );
        });
      }

      if (firstContent.video && Array.isArray(firstContent.video)) {
        this.total = firstContent.video.length;
        firstContent.video.forEach((videoSrc, index) => {
          const isActive = currentPage === index;
          const activeClass = isActive ? ' actived' : '';
          const hiddenClass = isActive ? '' : ' hidden';
          const fullVideoUrl = this.isFullUrl(videoSrc) ? videoSrc : (baseurl ?? '') + videoSrc;

          pageItems.push(
            <div key={`video-${index}`} className={`pageitem videoctn video-${index}${hiddenClass}`}>
              <video
                width="auto"
                height="auto"
                preload="auto"
                className="pvideo"
                onClick={() => this.playVideo(index)}
              >
                <source src={fullVideoUrl} type="video/mp4" />
              </video>
              <a
                className="playbutton videobtns"
                ref={`playbtton${index}`}
                onClick={() => this.playVideo(index)}
              >
                <span className="videoplaybtn" />
              </a>
            </div>
          );

          if (this.total > 1) {
            paginationElements.push(
              <li
                key={`pagination-${index}`}
                className={`paginationitem${activeClass}`}
                onClick={() => this.goToPage(index)}
              >
                <span className="dotbutton" />
              </li>
            );
          }
        });
      }

      if (firstContent.text) {
        if (Array.isArray(firstContent.text)) {
          if (currentPage < firstContent.text.length) {
            pageItems.push(
              <div key="txt" className="strctn">
                {this.breakLine(firstContent.text[currentPage])}
              </div>
            );
          }
        } else {
          pageItems.push(
            <div key="txt" className="strctn">
              {this.breakLine(firstContent.text)}
            </div>
          );
        }
      }

      contentElements.push(
        <div key="items" className="pitem">
          {pageItems}
        </div>
      );
    }

    return (
      <div ref="mount" className={`cardviewer${heightClass}`} style={positionStyle}>
        <div className="viewerheader">
          <div className="headerwrap">
            <div className="titlewrap">{viewertitle}</div>
            <span
              className="closecard"
              onClick={this.close}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <img className={this.state.hover ? 'hover-img' : ''} />
              <img className={this.state.hover ? '' : 'hover-img'} />
            </span>
          </div>
        </div>
        <div className="viewerbody">
          <div
            className="bodywrap"
            ref="guidecontens"
            onMouseOver={this.handleButtonMouseOver}
            onMouseOut={this.handleButtonMouseOut}
          >
            <div className="containerview" ref="scrollbar">
              {contentElements}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardViewer;