import React from 'react';
import PropTypes from 'prop-types';

interface VDividerStatusBarData {
  className?: string;
}

interface VDividerStatusBarProps {
  data?: VDividerStatusBarData;
}

interface VDividerStatusBarState {}

class VDividerStatusBar extends React.Component<VDividerStatusBarProps, VDividerStatusBarState> {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps: VDividerStatusBarProps = {
    data: {
      className: ""
    }
  };

  constructor(props: VDividerStatusBarProps) {
    super(props);
    this.state = {};
  }

  render(): React.ReactElement {
    let className = "vdivider-status-bar-container ";
    
    if (this.props.data?.className) {
      className += this.props.data.className;
    }

    return (
      <div className={className}>
        <div className="vdivider-status-bar" />
      </div>
    );
  }
}

export default VDividerStatusBar;