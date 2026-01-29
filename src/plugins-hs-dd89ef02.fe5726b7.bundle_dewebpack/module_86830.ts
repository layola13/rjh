import React from 'react';
import ReactDOM from 'react-dom';

interface Position {
  x: number;
  y: number;
}

interface GuideContent {
  image?: string[];
  video?: string[];
  text?: string | string[];
}

interface CardViewerProps {
  viewertitle?: string;
  contents?: GuideContent[];
  position?: Position;
  skipmsg?: string;
  btntext?: string;
  actioncall?: () => void;
  keytype?: string;
  isfixedheight?: boolean;
  baseurl?: string;
}

interface CardViewerState {
  position: Position;
  buttonText?: string;
  buttonAction?: (() => void) | undefined;
}

interface SignalDispatcher {
  dispatch: (data: { key?: string }) => void;
}

declare const hsw: {
  plugin: {
    userguide: {
      cardTypeEnum: {
        workflow: string;
      };
    };
  };
};

declare const ResourceManager: {
  getString: (key: string) => string;
  injectSVGImage: (selector: string) => void;
};

declare const signalSkipBtnClicked: SignalDispatcher;

const DEFAULT_VIDEO_POSTER = '';
const DEFAULT_PLAY_ICON_SRC = '';

class CardViewer extends React.Component<CardViewerProps, CardViewerState> {
  private pageNum: number = 0;
  private total: number = 0;
  private refs: {
    scrollbar: HTMLElement;
    mount: HTMLElement;
    guidecontens: HTMLElement;
    pagination: HTMLElement;
    [key: string]: HTMLElement;
  };

  static defaultProps: Partial<CardViewerProps> = {
    skipmsg: ''
  };

  constructor(props: CardViewerProps) {
    super(props);
    this.state = {
      position: props.position || { x: 0, y: 0 },
      buttonText: props.btntext,
      buttonAction: props.actioncall
    };
  }

  componentDidMount(): void {
    $(this.refs.scrollbar).perfectScrollbar({
      suppressScrollX: true
    });

    const scrollbarElement = $(ReactDOM.findDOMNode(this.refs.scrollbar) as Element);
    const video = scrollbarElement.find('video');
    
    if (video && video.length > 0) {
      video.eq(0).click();
    }

    this.pageNum = 0;
    ResourceManager.injectSVGImage('.videoplaybtn');
  }

  componentDidUpdate(): void {
    $(this.refs.scrollbar).perfectScrollbar('update');
    ResourceManager.injectSVGImage('.videoplaybtn');
  }

  componentWillUnmount(): void {
    $(this.refs.scrollbar).perfectScrollbar('destroy');
    this.pageNum = 0;
    this.total = 0;
  }

  skipAction = (): void => {
    signalSkipBtnClicked.dispatch({
      key: this.props.keytype
    });
    this.animationHide();
  };

  close = (): void => {
    if (this.props.keytype !== hsw.plugin.userguide.cardTypeEnum.workflow) {
      this._close();
    } else {
      this.animationHide();
    }
  };

  private _close(): void {
    try {
      const container = document.querySelector('.guidecontainer');
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
      }
    } catch (error) {
      // Silent error handling
    }
  }

  animationHide = (): void => {
    const helpButton = $('[data-toolbar-path="toolBar_help"]:visible').offset();
    
    if (helpButton) {
      let animationTarget = {
        left: helpButton.left + 5,
        top: helpButton.top + 5,
        width: 0,
        height: 0
      };

      if (this.props.keytype !== hsw.plugin.userguide.cardTypeEnum.workflow) {
        const mountElement = $(this.refs.mount);
        const currentOffset = mountElement.offset();
        
        if (currentOffset) {
          mountElement.css({
            left: currentOffset.left,
            top: currentOffset.top
          });
        }
      }

      $(this.refs.mount).animate(animationTarget, 800, () => {
        this._close();
      });
    }
  };

  goToPage = (pageIndex: number): boolean => {
    if (isNaN(parseInt(String(pageIndex), 10))) {
      return false;
    }

    this.pageNum = pageIndex;

    if (this.pageNum >= this.total || this.pageNum < 0) {
      this.pageNum = 0;
    }

    const contentsElement = $(ReactDOM.findDOMNode(this.refs.guidecontens) as Element);
    contentsElement.find('.pageitem').addClass('hidden');
    contentsElement.find('.pageitem').eq(pageIndex).removeClass('hidden');

    const paginationElement = $(ReactDOM.findDOMNode(this.refs.pagination) as Element);
    paginationElement.find('.paginationitem').removeClass('actived');
    paginationElement.find('.paginationitem').eq(pageIndex).addClass('actived');

    if (pageIndex === this.total - 1) {
      this.setState({
        buttonText: this.props.btntext,
        buttonAction: this.props.actioncall
      });
    } else {
      this.setState({
        buttonText: ResourceManager.getString('userguide_next'),
        buttonAction: this.goNextPage
      });
    }

    return true;
  };

  goPrevPage = (): boolean => {
    if (isNaN(parseInt(String(this.pageNum), 10))) {
      return false;
    }

    let prevPage = this.pageNum - 1;
    if (prevPage < 0) {
      prevPage = this.total - 1;
    }

    return this.goToPage(prevPage);
  };

  goNextPage = (): boolean => {
    if (isNaN(parseInt(String(this.pageNum), 10))) {
      return false;
    }

    let nextPage = this.pageNum + 1;
    if (nextPage >= this.total) {
      nextPage = 0;
    }

    return this.goToPage(nextPage);
  };

  playVideo = (videoIndex: number): boolean => {
    const videoElement = document.querySelector(`.video-${videoIndex} video`) as HTMLVideoElement;
    
    if (!videoElement) {
      return false;
    }

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

  breakLine = (text: string): React.ReactNode[] => {
    const lineBreakPattern = /(<br \/>)/g;
    return text.split(lineBreakPattern).map((segment, index) => {
      return segment.match(lineBreakPattern) 
        ? React.createElement('br', { key: index }) 
        : segment;
    });
  };

  isFullUrl = (url: string): boolean => {
    return url.indexOf('http://') > -1 || url.indexOf('https://') > -1;
  };

  render(): React.ReactElement {
    const currentPage = this.pageNum || 0;
    const title = this.props.viewertitle;
    const contents = this.props.contents;
    const skipMessage = this.props.skipmsg;
    
    const buttonText = this.props.keytype === hsw.plugin.userguide.cardTypeEnum.workflow
      ? this.props.btntext
      : this.state.buttonText;
    
    const buttonAction = this.state.buttonAction;
    const position = this.state.position;
    const fixedHeightClass = this.props.isfixedheight ? ' fixedheight' : '';

    const pageItems: React.ReactElement[] = [];
    const paginationItems: React.ReactElement[] = [];

    if (contents && contents.length > 0) {
      const content = contents[0];
      const contentElements: React.ReactElement[] = [];

      // Handle images
      if (content.image && Array.isArray(content.image)) {
        this.total = content.image.length;
        
        content.image.forEach((imageSrc, index) => {
          const isActive = currentPage === index;
          const hiddenClass = isActive ? '' : ' hidden';
          const imageUrl = this.isFullUrl(imageSrc) 
            ? imageSrc 
            : (this.props.baseurl ?? '') + imageSrc;

          contentElements.push(
            React.createElement('div', {
              key: `imgs-${index}`,
              className: `pageitem imgctn${hiddenClass}`
            }, React.createElement('img', {
              src: imageUrl,
              className: 'pimg'
            }))
          );

          if (this.total > 1) {
            const activeClass = isActive ? ' actived' : '';
            paginationItems.push(
              React.createElement('li', {
                key: `pagination-${index}`,
                className: `paginationitem${activeClass}`,
                onClick: () => this.goToPage(index)
              }, React.createElement('span', {
                className: 'dotbutton'
              }))
            );
          }
        });
      }

      // Handle videos
      if (content.video && Array.isArray(content.video)) {
        this.total = content.video.length;
        
        content.video.forEach((videoSrc, index) => {
          const isActive = currentPage === index;
          const hiddenClass = isActive ? '' : ' hidden';
          const videoUrl = this.isFullUrl(videoSrc) 
            ? videoSrc 
            : (this.props.baseurl ?? '') + videoSrc;

          contentElements.push(
            React.createElement('div', {
              key: `video-${index}`,
              className: `pageitem videoctn video-${index}${hiddenClass}`
            }, 
            React.createElement('video', {
              width: 'auto',
              height: 'auto',
              poster: DEFAULT_VIDEO_POSTER,
              preload: 'auto',
              className: 'pvideo',
              onClick: () => this.playVideo(index)
            }, React.createElement('source', {
              src: videoUrl,
              type: 'video/mp4'
            })),
            React.createElement('a', {
              className: 'playbutton videobtns',
              ref: `playbtton${index}`,
              onClick: () => this.playVideo(index)
            }, React.createElement('span', {
              className: 'videoplaybtn',
              'data-src': DEFAULT_PLAY_ICON_SRC
            })))
          );

          if (this.total > 1) {
            const activeClass = isActive ? ' actived' : '';
            paginationItems.push(
              React.createElement('li', {
                key: `pagination-${index}`,
                className: `paginationitem${activeClass}`,
                onClick: () => this.goToPage(index)
              }, React.createElement('span', {
                className: 'dotbutton'
              }))
            );
          }
        });
      }

      // Add pagination view
      if (paginationItems.length > 0) {
        contentElements.push(
          React.createElement('div', {
            ref: 'pagination',
            className: 'paginationview'
          }, React.createElement('ul', null, ...paginationItems))
        );
      }

      // Handle text content
      if (content.text) {
        if (Array.isArray(content.text)) {
          if (currentPage < content.text.length) {
            contentElements.push(
              React.createElement('div', {
                key: 'txt',
                className: 'strctn'
              }, this.breakLine(content.text[currentPage]))
            );
          }
        } else {
          contentElements.push(
            React.createElement('div', {
              key: 'txt',
              className: 'strctn'
            }, this.breakLine(content.text))
          );
        }
      }

      pageItems.push(
        React.createElement('div', {
          key: 'items',
          className: 'pitem'
        }, ...contentElements)
      );
    }

    // Adjust button for last page
    let finalButtonText = buttonText;
    let finalButtonAction = buttonAction;
    
    if (this.pageNum === paginationItems.length - 1) {
      finalButtonText = this.props.btntext;
      finalButtonAction = this.props.actioncall;
    }

    return React.createElement('div', {
      ref: 'mount',
      className: `cardvieweritem${fixedHeightClass}`,
      style: position
    },
    React.createElement('div', {
      className: 'viewerheader'
    },
    React.createElement('div', {
      className: 'headerwrap'
    }, title),
    React.createElement('span', {
      className: 'closecard',
      onClick: this.close
    }, 'x')),
    React.createElement('div', {
      className: 'viewerbody'
    },
    React.createElement('div', {
      className: 'bodywrap',
      ref: 'guidecontens'
    },
    React.createElement('div', {
      className: 'containerview',
      ref: 'scrollbar'
    }, ...pageItems))),
    React.createElement('div', {
      className: 'viewerfooter'
    },
    React.createElement('div', {
      className: 'footerwrap'
    },
    React.createElement('div', {
      className: 'actionbuttons'
    },
    React.createElement('a', {
      title: skipMessage,
      className: 'skipmsg',
      onClick: this.skipAction
    }, skipMessage),
    React.createElement('button', {
      type: 'button',
      title: finalButtonText,
      className: 'btn btn-default surebtn',
      onClick: finalButtonAction
    }, finalButtonText)))));
  }
}

export default CardViewer;