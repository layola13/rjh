import React from 'react';
import { Switch } from 'antd';

interface ToggleButtonData {
  label?: string;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disable?: boolean;
  className?: string;
}

interface ToggleButtonProps {
  id?: string;
  data: ToggleButtonData;
}

interface ToggleButtonState {
  selectedChildren: boolean;
  disable: boolean;
}

export default class ToggleButton extends React.Component<ToggleButtonProps, ToggleButtonState> {
  static defaultProps: ToggleButtonProps = {
    id: '',
    data: {
      label: '',
      checkedChildren: '有',
      unCheckedChildren: '无',
      value: true,
      onValueChange: () => {},
      disable: false
    }
  };

  constructor(props: ToggleButtonProps) {
    super(props);
    
    this.state = {
      selectedChildren: this.props.data.value ?? false,
      disable: this.props.data.disable ?? false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps: ToggleButtonProps): void {
    this.setState({
      selectedChildren: nextProps.data.value ?? false,
      disable: nextProps.data.disable ?? false
    });
  }

  handleChange(checked: boolean): void {
    this.setState({
      selectedChildren: checked
    });
    
    this.props.data.onValueChange?.(checked);
  }

  render(): React.ReactElement {
    let className = 'toggle-button ';
    
    if (this.props.data.className) {
      className += this.props.data.className;
    }

    return (
      <div className={className}>
        <span className="toggle-title">{this.props.data.label}</span>
        <Switch
          checkedChildren={this.props.data.checkedChildren}
          unCheckedChildren={this.props.data.unCheckedChildren}
          onChange={this.handleChange}
          checked={this.state.selectedChildren}
          disabled={this.state.disable}
        />
      </div>
    );
  }
}