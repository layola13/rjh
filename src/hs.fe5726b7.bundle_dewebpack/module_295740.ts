import React from 'react';
import PropTypes from 'prop-types';
import ButtonComponent from './ButtonComponent';

interface ExpandButtonProps {
  icon?: string;
  className?: string;
  changed?: () => void;
  expanded?: boolean;
}

interface ExpandButtonState {
  expanded: boolean;
  hover: boolean;
}

export default class ExpandButton extends React.Component<ExpandButtonProps, ExpandButtonState> {
  static propTypes = {
    icon: PropTypes.string,
    className: PropTypes.string,
    changed: PropTypes.func,
    expanded: PropTypes.bool
  };

  static defaultProps = {
    className: ""
  };

  constructor(props: ExpandButtonProps) {
    super(props);
    
    this.state = {
      expanded: false,
      hover: false
    };

    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
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

  isExpanded(): boolean {
    return this.props.expanded ?? false;
  }

  render(): React.ReactElement {
    let cssClass = "";
    
    if (this.state.hover) {
      cssClass = " hover";
    }
    
    if (this.isExpanded()) {
      cssClass = " active";
    }

    return React.createElement(ButtonComponent, {
      className: `hsw-expandbtn ${this.props.className}${cssClass}`,
      icon: this.props.icon,
      onMouseOver: this.onMouseOver,
      onMouseOut: this.onMouseOut,
      click: this.props.changed
    });
  }
}