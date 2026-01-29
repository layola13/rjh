import React from 'react';
import PropTypes from 'prop-types';

interface Region {
  code: string;
  regioncode: string;
  displayName: string;
}

interface RegionSwitcherProps {
  regions: Region[];
  current: Region;
  onSelectedChange?: (code: string, region: Region) => void;
}

interface RegionSwitcherState {
  selectedcode: string;
  show: boolean;
}

class RegionSwitcher extends React.Component<RegionSwitcherProps, RegionSwitcherState> {
  static propTypes = {
    regions: PropTypes.array,
    current: PropTypes.object,
    onSelectedChange: PropTypes.func
  };

  constructor(props: RegionSwitcherProps) {
    super(props);
    
    this.state = {
      selectedcode: '',
      show: false
    };
    
    this.onSelectedChange = this.onSelectedChange.bind(this);
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  onSelectedChange(code: string, region: Region): void {
    if (this.props.onSelectedChange) {
      this.props.onSelectedChange(code, region);
    }
    
    this.setState({
      selectedcode: code
    });
  }

  onShow(): void {
    this.setState({
      show: true,
      selectedcode: this.props.current.regioncode
    });
  }

  onHide(): void {
    this.setState({
      show: false
    });
  }

  renderItems(): JSX.Element {
    const className = this.props.regions.length === 1 
      ? 'region-list hide-region-list' 
      : 'region-list';
    
    return (
      <ul className={className}>
        {this.props.regions.map((region) => (
          <RegionItem
            key={region.code}
            current={this.props.current}
            selected={region.code === this.state.selectedcode}
            region={region}
            onSelectedChange={this.onSelectedChange}
          />
        ))}
      </ul>
    );
  }

  render(): JSX.Element {
    return (
      <span
        className="switch-language unselectable"
        onMouseLeave={this.onHide}
        onMouseEnter={this.onShow}
      >
        <Icon src="earth.svg" />
        <span>{this.props.current.displayName}</span>
        <span className="caret" />
        {this.state.show ? this.renderItems() : null}
      </span>
    );
  }
}

export default RegionSwitcher;