import React from 'react';

interface PopoverProps {
  className?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  positionLeft?: number;
  positionTop?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  setKeepOpen?: (keepOpen: boolean) => void;
  onRemove?: () => void;
  canRemove?: boolean;
  trigger?: 'click' | 'hover' | 'manual' | 'new';
  type?: string;
  showDot?: boolean;
  popover?: {
    props: {
      placement: 'top' | 'right' | 'bottom' | 'left';
      children: React.ReactNode;
    };
  };
  children?: React.ReactNode;
}

interface PopoverState {
  left: number;
  top: number;
}

class Popover extends React.Component<PopoverProps, PopoverState> {
  static defaultProps: Partial<PopoverProps> = {
    className: '',
    placement: 'top',
    positionLeft: 0,
    positionTop: 0,
    onMouseEnter: () => {},
    onMouseLeave: () => {}
  };

  constructor(props: PopoverProps) {
    super(props);

    this.state = {
      left: props.positionLeft ?? 0,
      top: props.positionTop ?? 0
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter(): void {
    this.props.setKeepOpen?.(true);
    this.props.onMouseEnter?.();
  }

  onMouseLeave(): void {
    this.props.setKeepOpen?.(false);
    if (this.props.trigger === 'hover' && this.props.onRemove) {
      this.props.onRemove();
    }
    this.props.onMouseLeave?.();
  }

  setPosition(left: number, top: number): void {
    this.setState({
      left,
      top
    });
  }

  render(): React.ReactElement {
    const baseClass = 'hs-popover';
    const style: React.CSSProperties = {
      left: this.state.left,
      top: this.state.top,
      display: 'block'
    };

    const popoverProps = this.props.popover?.props ?? this.props;
    const placementClass = `${baseClass}-${popoverProps.placement}`;
    const typeClass = this.props.type ? `${baseClass}-${this.props.type}` : '';

    return (
      <div
        className={`${baseClass}-item ${placementClass} hs-popover-shadow ${typeClass} ${this.props.className}`}
        style={style}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div className={`${baseClass}-context`}>
          {this.props.showDot && <span className={`${baseClass}-dot`} />}
          {popoverProps.children}
          {this.props.canRemove && (
            <span
              className={`${baseClass}-remove`}
              onClick={this.props.onRemove}
            />
          )}
        </div>
        <div className={`${baseClass}-caret`} />
      </div>
    );
  }
}

export default Popover;