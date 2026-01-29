import React from 'react';

interface PinButtonProps {
  icon?: string;
  className?: string;
  changed?: (pined: boolean) => void;
}

interface PinButtonState {
  pined: boolean;
  hover: boolean;
}

class PinButton extends React.Component<PinButtonProps, PinButtonState> {
  static defaultProps: Partial<PinButtonProps> = {
    className: ''
  };

  constructor(props: PinButtonProps) {
    super(props);
    this.state = {
      pined: false,
      hover: false
    };
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onMouseOver(): void {
    this.setState({
      hover: true
    });
  }

  onMouseOut(): void {
    this.setState({
      hover: false
    });
  }

  onClick(): void {
    const pined = !this.state.pined;
    this.setState({
      pined
    });
    this.props.changed?.(pined);
  }

  isPinned(): boolean {
    return this.state.pined;
  }

  render(): React.ReactElement {
    let classNameSuffix = '';
    if (this.state.hover) {
      classNameSuffix = ' hover';
    }
    if (this.isPinned()) {
      classNameSuffix = ' active';
    }
    return React.createElement(IconButton, {
      className: `hsw-pinbtn ${this.props.className}${classNameSuffix}`,
      icon: this.props.icon,
      onMouseOver: this.onMouseOver,
      onMouseOut: this.onMouseOut,
      click: this.onClick
    });
  }
}

export default PinButton;