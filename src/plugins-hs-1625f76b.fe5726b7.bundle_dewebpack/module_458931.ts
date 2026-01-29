import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

interface LargeViewData {
  img: string;
  label: string;
  iconTop: number | string;
  hide: boolean;
}

interface CeilingLargeViewProps {
  data: LargeViewData;
}

interface CeilingLargeViewState {
  img: string;
  label: string;
  iconTop: number | string;
  hide: boolean;
}

const HIDE_DELAY_MS = 1000;
const BOTTOM_OFFSET = 94;
const LEFT_POSITION = '342px';

export default class CeilingLargeView extends React.Component<CeilingLargeViewProps, CeilingLargeViewState> {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps: CeilingLargeViewProps = {
    data: {
      img: '',
      label: 'text',
      iconTop: 0,
      hide: true
    }
  };

  private timer?: NodeJS.Timeout;

  constructor(props: CeilingLargeViewProps) {
    super(props);
    
    const { img, label, iconTop, hide } = props.data;
    
    this.state = {
      img,
      label,
      iconTop,
      hide
    };
  }

  componentDidMount(): void {
    this.calLargeViewTop();
  }

  UNSAFE_componentWillReceiveProps(nextProps: CeilingLargeViewProps): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    
    const { hide, iconTop, img, label } = nextProps.data;
    this.setState({
      hide,
      iconTop,
      img,
      label
    });
  }

  componentDidUpdate(): void {
    this.calLargeViewTop();
  }

  /**
   * Calculate and adjust the large view top position to prevent overflow
   */
  calLargeViewTop(): void {
    const element = ReactDOM.findDOMNode(this) as HTMLElement | null;
    
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const bodyHeight = document.getElementsByTagName('body')[0].clientHeight;
    const elementHeight = rect.height;

    if (bodyHeight < rect.bottom + BOTTOM_OFFSET) {
      const adjustedTop = bodyHeight - elementHeight - BOTTOM_OFFSET;
      element.style.top = `${adjustedTop}px`;
    }
  }

  /**
   * Hide the large view after a delay
   */
  hideLargeView(): void {
    this.timer = setTimeout(() => {
      this.setState({
        hide: true
      });
    }, HIDE_DELAY_MS);
  }

  /**
   * Cancel the scheduled hide operation
   */
  stopHideLargeView(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  /**
   * Hide the large view immediately without delay
   */
  hideLargeViewImmediately(): void {
    this.setState({
      hide: true
    });
  }

  render(): React.ReactElement {
    const { hide, img, label, iconTop } = this.state;
    const topPosition = iconTop || 'unset';
    const className = hide 
      ? 'ceiling-large-view ceiling-large-view-hide' 
      : 'ceiling-large-view';

    return (
      <div
        className={className}
        style={{
          top: topPosition,
          left: LEFT_POSITION
        }}
        onMouseEnter={() => this.stopHideLargeView()}
        onMouseLeave={() => this.hideLargeView()}
      >
        <img
          className="ceiling-large-view-content-img"
          src={img}
        />
        <div className="ceiling-large-view-content-info">
          <div className="ceiling-large-view-logo" />
          <div className="ceiling-large-view-label">
            {label}
          </div>
        </div>
      </div>
    );
  }
}