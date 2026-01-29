import React from 'react';
import PropTypes from 'prop-types';

interface ButtonProps {
  isActive?: boolean;
  type?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  styleName?: string;
  size?: string;
  tooltip?: string;
  onMouseOver?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOut?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  dataIndex?: string | number;
  children?: React.ReactNode;
}

class Button extends React.Component<ButtonProps> {
  static propTypes = {
    isActive: PropTypes.bool,
    type: PropTypes.string,
    onClick: PropTypes.func,
    styleName: PropTypes.string,
    size: PropTypes.string,
    tooltip: PropTypes.string,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps: ButtonProps = {
    isActive: false,
    type: 'normal',
    onClick: undefined,
    styleName: '',
    size: '',
    tooltip: undefined,
    onMouseOver: null,
    onMouseOut: null,
    onFocus: null,
    onBlur: null
  };

  constructor(props: ButtonProps) {
    super(props);
  }

  render(): React.ReactNode {
    let className = `hsw-btn hsw-btn-${this.props.type}`;
    
    if (this.props.styleName) {
      className += ` ${this.props.styleName}`;
    }
    
    if (this.props.isActive) {
      className += ' hsw-btn-active';
    }
    
    if (this.props.size) {
      className += ` btn-${this.props.size}`;
    }

    const button = React.createElement(
      'button',
      {
        type: 'button',
        className,
        onClick: this.props.onClick,
        onMouseOver: this.props.onMouseOver,
        onMouseOut: this.props.onMouseOut,
        onFocus: this.props.onFocus,
        onBlur: this.props.onBlur,
        style: this.props.style,
        'data-index': this.props.dataIndex
      },
      React.createElement('span', null, this.props.children)
    );

    return this.props.tooltip
      ? React.createElement(
          HSApp.UI.Popover.Tooltip,
          {
            title: this.props.tooltip,
            placement: 'bottom',
            trigger: 'hover'
          },
          button
        )
      : button;
  }
}

export default Button;