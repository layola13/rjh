import React, { Component, ReactElement } from 'react';
import hoverIcon from './assets/hover-icon';
import defaultIcon from './assets/default-icon';

interface LargeViewIconState {
  hover: boolean;
}

interface LargeViewIconProps {}

export default class LargeViewIcon extends Component<LargeViewIconProps, LargeViewIconState> {
  constructor(props: LargeViewIconProps) {
    super(props);
    this.state = {
      hover: false
    };
  }

  private onMouseEnterHandler(): void {
    this.setState({
      hover: true
    });
  }

  private onMouseLeaveHandler(): void {
    this.setState({
      hover: false
    });
  }

  render(): ReactElement {
    const { hover } = this.state;
    
    return (
      <div
        className="largeviewiconclickarea"
        onMouseEnter={this.onMouseEnterHandler.bind(this)}
        onMouseLeave={this.onMouseLeaveHandler.bind(this)}
      >
        <img
          id="large-view-img"
          src={hover ? hoverIcon : defaultIcon}
        />
      </div>
    );
  }
}