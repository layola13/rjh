import React from 'react';
import PropTypes from 'prop-types';

interface ScrollTipProps {
  containerEleClass: string;
  id: string;
  index?: number;
  extraHeight?: number;
  style?: React.CSSProperties & { width?: number };
  blueTheme?: boolean;
}

interface ScrollTipState {
  show: boolean;
}

export default class ScrollTip extends React.Component<ScrollTipProps, ScrollTipState> {
  static propTypes = {
    containerEleClass: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };

  constructor(props: ScrollTipProps) {
    super(props);
    this.state = {
      show: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.checkIsShowScrollTip = this.checkIsShowScrollTip.bind(this);
  }

  componentDidMount(): void {
    const { containerEleClass, index } = this.props;
    const elements = document.querySelectorAll<HTMLElement>(`.${containerEleClass}`);
    let containerElement = elements[0];
    
    if (index !== undefined) {
      containerElement = elements[index];
    }
    
    if (containerElement) {
      containerElement.addEventListener('scroll', this.handleScroll);
    }
    
    window.addEventListener('resize', this.handleResize);
    this.checkIsShowScrollTip();
  }

  componentWillUnmount(): void {
    const { containerEleClass, index } = this.props;
    const elements = document.querySelectorAll<HTMLElement>(`.${containerEleClass}`);
    let containerElement = elements[0];
    
    if (index !== undefined) {
      containerElement = elements[index];
    }
    
    if (containerElement) {
      containerElement.removeEventListener('scroll', this.handleScroll);
    }
    
    window.removeEventListener('resize', this.handleResize);
  }

  componentDidUpdate(): void {
    this.checkIsShowScrollTip();
  }

  checkIsShowScrollTip(): void {
    this.resetScrollTipStatus();
    
    let shouldShow = false;
    const containerElement = document.querySelector<HTMLElement>(`.${this.props.containerEleClass}`);
    const extraHeight = this.props.extraHeight ?? 0;
    
    if (containerElement && containerElement.scrollHeight > containerElement.clientHeight) {
      const scrolledToBottom = Math.ceil(containerElement.clientHeight + containerElement.scrollTop) >= containerElement.scrollHeight - extraHeight;
      shouldShow = !scrolledToBottom;
    }
    
    if (this.state.show !== shouldShow) {
      this.setState({ show: shouldShow });
    }
  }

  resetScrollTipStatus(): void {
    const { id } = this.props;
    const tipElement = document.querySelector<HTMLElement>(`#${id}`);
    
    if (tipElement) {
      $(tipElement).css({ display: 'block' });
    }
  }

  handleResize(): void {
    setTimeout(() => {
      this.checkIsShowScrollTip();
    }, 100);
  }

  handleScroll(): void {
    const { id } = this.props;
    const tipElement = document.querySelector<HTMLElement>(`#${id}`);
    
    if (tipElement) {
      $(tipElement).css({ display: 'none' });
    }
  }

  setScrollTipWidth(): void {
    const { style, id, containerEleClass } = this.props;
    
    if (style) {
      if (!style.width) {
        const containerElement = document.querySelector<HTMLElement>(`.${containerEleClass}`);
        style.width = containerElement?.offsetWidth ?? 0;
      }
      
      if (id === 'scrolltipInCategoryPanelRightview') {
        const containerElement = document.querySelector<HTMLElement>(`.${containerEleClass}`);
        style.width = containerElement?.offsetWidth ?? style.width;
      }
    }
  }

  doRefresh(): void {
    this.checkIsShowScrollTip();
  }

  render(): React.ReactNode {
    const { style, blueTheme, id } = this.props;
    
    if (!this.state.show) {
      return null;
    }
    
    this.setScrollTipWidth();
    
    const themeClass = blueTheme ? ' themeClass' : '';
    
    return (
      <div className={`scroll-tip-container${themeClass}`} style={style} id={id}>
        <div className="scroll-tip" />
        <div className="arrow-container">
          <i className="arrow" />
        </div>
      </div>
    );
  }
}