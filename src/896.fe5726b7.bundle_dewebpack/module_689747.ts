import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface StyleType {
  code: string;
  name: string;
}

interface StyleTypeSelectProps {
  styleTypeId?: string;
  styleTypeList?: StyleType[];
  styleTypeChangedNotify?: (value: string) => void;
}

interface StyleTypeSelectState {
  styleTypeSelectOptions: React.ReactElement[];
}

class StyleTypeSelect extends React.Component<StyleTypeSelectProps, StyleTypeSelectState> {
  static defaultProps: StyleTypeSelectProps = {
    styleTypeId: '',
    styleTypeList: [],
    styleTypeChangedNotify: () => {},
  };

  private _styleTypeSelectOptions: React.ReactElement[] = [];

  UNSAFE_componentWillMount(): void {
    this._resetStyleTypeSelectOptions(this.props.styleTypeList ?? []);
  }

  UNSAFE_componentWillReceiveProps(nextProps: StyleTypeSelectProps): void {
    this._resetStyleTypeSelectOptions(nextProps.styleTypeList ?? []);
  }

  private _resetStyleTypeSelectOptions(styleTypeList: StyleType[]): void {
    this._styleTypeSelectOptions = [];
    const length = styleTypeList.length;
    
    for (let i = 0; i < length; ++i) {
      this._styleTypeSelectOptions.push(
        <Option title={styleTypeList[i].name} key={i} value={styleTypeList[i].code}>
          {styleTypeList[i].name}
        </Option>
      );
    }
  }

  private _onChange = (value: string): void => {
    this.props.styleTypeChangedNotify?.(value);
  };

  render(): React.ReactElement {
    return (
      <Select
        dropdownClassName="model-select-dropdown"
        onChange={this._onChange}
        className="model-select"
        defaultValue={this.props.styleTypeId}
      >
        {this._styleTypeSelectOptions}
      </Select>
    );
  }
}

export default StyleTypeSelect;