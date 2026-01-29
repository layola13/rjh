import React from 'react';

interface TooltipData {
  tooltip?: string;
  className?: string;
  label: string;
}

interface SettingItem {
  value: string | number;
  tooltip?: string;
  className?: string;
  label: string;
}

interface InputData {
  value: any;
}

interface DropdownData {
  [key: string]: any;
}

interface TabSelectData {
  tabs: TooltipData[];
  disabled: boolean;
  hasLockIcon: boolean;
  onChange: (index: number, event: any) => void;
  defaultIndex: number;
  className: string;
}

interface LabelRadioInputProps {
  id?: string;
  data: {
    label?: string;
    disabled?: boolean;
    className?: string;
    value: string | number;
    setting: SettingItem[];
    disableRadio?: boolean;
    inputData: InputData;
    dropdownData?: DropdownData;
    onChange?: (value: string | number, inputData: any) => void;
  };
}

interface LabelRadioInputState {
  selected: string | number;
}

class LabelRadioInput extends React.Component<LabelRadioInputProps, LabelRadioInputState> {
  private _inputData: any;

  constructor(props: LabelRadioInputProps) {
    super(props);
    
    this.state = {
      selected: props.data.value || props.data.setting[0].value
    };
    
    this._inputData = props.data.inputData.value;
  }

  componentWillUpdate(): void {
    if (this._inputData) {
      this.props.data.inputData.value = this._inputData;
    }
  }

  selectedChange = (index: number, event: any): void => {
    if (!this.props.data.disabled) {
      const setting = this.props.data.setting;
      const selectedValue = setting?.[index]?.value;
      
      this.props.data.onChange?.(selectedValue, this._inputData);
    }
  };

  setInputData = (data: any): void => {
    this._inputData = data;
  };

  renderRadioGroup = (): React.ReactElement => {
    const { data, id } = this.props;
    const { setting, disableRadio, value } = data;

    const tabs: TooltipData[] = setting.map((item) => ({
      tooltip: item.tooltip,
      className: item.className,
      label: item.label
    }));

    const defaultIndex = setting.findIndex((item) => item.value === value);

    const tabSelectData: TabSelectData = {
      tabs,
      disabled: disableRadio ?? false,
      hasLockIcon: true,
      onChange: this.selectedChange,
      defaultIndex,
      className: 'tpzz-propertybar-tab-select'
    };

    const isDisabled = this.props.data.disableRadio || false;

    return <TabSelect disabled={isDisabled} id={id} data={tabSelectData} />;
  };

  getTooltipText = (): string => {
    let tooltipText = '';
    
    this.props.data.setting.forEach((item) => {
      if (item.value === this.state.selected && item.tooltip) {
        tooltipText = item.tooltip;
      }
    });

    return tooltipText;
  };

  render(): React.ReactElement {
    const { data } = this.props;
    const { label, disabled, className } = data;
    const disabledClass = disabled ? ' disabled' : '';

    return (
      <div className={`property-bar-tpzz-labelradioinput${disabledClass} ${className ?? ''}`}>
        {label && (
          <div className="property-bar-tpzz-labelradioinput__label">
            {label}
          </div>
        )}
        <div className="property-bar-tpzz-labelradioinput__content">
          <div className="property-bar-tpzz-labelradioinput__content__tabs">
            <div className="radio-block">
              {this.renderRadioGroup()}
            </div>
          </div>
          <div className="property-bar-tpzz-labelradioinput__content__input">
            {data.dropdownData ? (
              <Dropdown data={data.dropdownData} />
            ) : (
              <Input data={data.inputData} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default LabelRadioInput;