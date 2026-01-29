import React from 'react';
import ReactDOM from 'react-dom';
import { Tooltip, CheckBox, SmartText, NumberInput } from './components';
import { Icons } from './Icons';

enum DecimalAdjustValue {
  VALUE_Default = 10,
  VALUE_FootInch = 2,
  VALUE_LengthUnit = 1,
}

interface RangeRule {
  min?: number;
  max?: number;
}

interface ValidationRules {
  range?: RangeRule;
  positiveOnly?: boolean;
}

interface CheckboxOptions {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

interface IconConfig {
  iconColor?: string;
  tooltip?: string;
  type?: string;
  iconPosition?: 'left' | 'right';
}

interface CardConfig {
  [key: string]: unknown;
}

interface ComponentOptions {
  unitType?: number;
  displayDigits?: number;
  includeUnit?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  rules?: ValidationRules;
  disabledTooltip?: string;
  step?: number;
}

interface LengthInputData {
  label?: React.ReactNode;
  className?: string;
  disableChange?: boolean;
  options?: ComponentOptions;
  checkboxOptions?: CheckboxOptions;
  scaleStep?: number;
  lengthStep?: number;
  value?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  tooltip?: string;
  icon?: IconConfig;
  card?: CardConfig;
  [key: string]: unknown;
}

interface AssembledProps {
  unit: number;
  includeUnit?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  precision: number;
  isLenghtUnit: boolean;
  disabledTooltip?: string;
  step: number;
  min?: number;
  max?: number;
  value?: number;
  baseUnit?: string;
  [key: string]: unknown;
}

interface ComponentState {
  checked: boolean;
  value: number;
  hoverInput: boolean;
  hoverEle: HTMLElement | null;
}

interface LengthInputProps {
  data: LengthInputData;
}

const SUPPORTED_LENGTH_UNITS = [
  HSCore.Util.Unit.LengthUnitTypeEnum.foot,
  HSCore.Util.Unit.LengthUnitTypeEnum.inch,
  HSCore.Util.Unit.LengthUnitTypeEnum.meter,
  HSCore.Util.Unit.LengthUnitTypeEnum.centimeter,
  HSCore.Util.Unit.LengthUnitTypeEnum.millimeter,
  HSCore.Util.Unit.LengthUnitTypeEnum.kilometer,
];

const PRECISION_DIGITS = 6;

/**
 * Assembles props for the number input component from provided configuration
 */
export function assembleProps(data: LengthInputData): AssembledProps {
  const {
    options = {},
    scaleStep,
    lengthStep = 1,
    ...restProps
  } = data;

  const floorplan = HSApp.App.getApp().floorplan;
  const assembledProps: AssembledProps = { ...restProps } as AssembledProps;

  if (options) {
    const {
      unitType,
      displayDigits,
      includeUnit,
      readOnly,
      disabled,
      rules,
      disabledTooltip,
      step: optionsStep,
    } = options;

    const unit = unitType ?? floorplan.displayLengthUnit;
    const precision = displayDigits !== undefined ? displayDigits : floorplan.displayLengthPrecisionDigits;
    const isLenghtUnit = SUPPORTED_LENGTH_UNITS.includes(unit);

    Object.assign(assembledProps, {
      unit,
      includeUnit,
      readOnly,
      disabled: disabled || readOnly,
      precision,
      isLenghtUnit,
      disabledTooltip,
    });

    let step: number;
    if (optionsStep && optionsStep > 0) {
      step = optionsStep;
    } else {
      let valueMultiplier = DecimalAdjustValue.VALUE_Default;
      if (unit === HSCore.Util.Unit.LengthUnitTypeEnum.foot || unit === HSCore.Util.Unit.LengthUnitTypeEnum.inch) {
        valueMultiplier = DecimalAdjustValue.VALUE_FootInch;
      } else if (!isLenghtUnit) {
        valueMultiplier = DecimalAdjustValue.VALUE_LengthUnit;
      }
      step = (scaleStep ?? lengthStep) * Math.pow(valueMultiplier, -precision);
    }

    Object.assign(assembledProps, { step });

    if (rules) {
      const { range, positiveOnly } = rules;
      const rangeConstraints: Partial<AssembledProps> = {};

      if (range) {
        const minMaxConstraints: { min?: number; max?: number } = {};

        if (typeof range.min === 'number') {
          const minValue = isLenghtUnit
            ? HSCore.Util.Unit.ConvertMeterToCustom(unit, range.min)
            : range.min;
          minMaxConstraints.min = Number(minValue.toFixed(PRECISION_DIGITS));
        }

        if (typeof range.max === 'number') {
          const maxValue = isLenghtUnit
            ? HSCore.Util.Unit.ConvertMeterToCustom(unit, range.max)
            : range.max;
          minMaxConstraints.max = Number(maxValue.toFixed(PRECISION_DIGITS));
        }

        Object.assign(rangeConstraints, minMaxConstraints);
      }

      if (positiveOnly && range?.min && range.min < 0) {
        Object.assign(rangeConstraints, { min: 0 });
      }

      Object.assign(assembledProps, rangeConstraints);
    }
  }

  return assembledProps;
}

/**
 * Performs decimal adjustment (round, floor, or ceil) with specified precision
 */
export function decimalAdjust(
  method: 'round' | 'floor' | 'ceil',
  value: number | undefined,
  precision: number | undefined
): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (precision === undefined || +precision === 0) {
    return Math[method](value);
  }

  let numValue = +value;
  let exp = +precision;

  if (isNaN(numValue) || typeof exp !== 'number' || exp % 1 !== 0) {
    return NaN;
  }

  const valueStr = numValue.toString().split('e');
  const adjustedValue = Math[method](
    +(valueStr[0] + 'e' + (valueStr[1] ? +valueStr[1] - exp : -exp))
  );

  const resultStr = adjustedValue.toString().split('e');
  return +(resultStr[0] + 'e' + (resultStr[1] ? +resultStr[1] + exp : exp));
}

class PropertyBarLengthInput extends React.Component<LengthInputProps, ComponentState> {
  private numberInputProps: AssembledProps;

  constructor(props: LengthInputProps) {
    super(props);

    this.numberInputProps = assembleProps(this.props.data);
    this.state = {
      checked: this.props.data.checkboxOptions?.checked ?? true,
      value: this.numberInputProps.value ?? 0,
      hoverInput: false,
      hoverEle: null,
    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps: LengthInputProps): void {
    this.numberInputProps = assembleProps(nextProps.data);
    const checked = nextProps.data.checkboxOptions?.checked ?? true;

    this.setState({
      value: this.numberInputProps.value ?? 0,
      checked,
    });

    this.updateController?.(nextProps);
  }

  private onFocus = (): void => {
    const onFocusCallback = this.props.data.onFocus;
    onFocusCallback?.();
  };

  private onBlur = (): void => {
    const onBlurCallback = this.props.data.onBlur;
    onBlurCallback?.();
  };

  private onMouseOverInput = (event: React.MouseEvent<HTMLDivElement>): void => {
    const currentTarget = event.currentTarget;
    const { card } = this.props.data;

    if (card) {
      this.setState({
        hoverEle: currentTarget as HTMLElement,
        hoverInput: true,
      });
    }
  };

  private onMouseLeaveInput = (): void => {
    const { card } = this.props.data;

    if (card) {
      this.setState({
        hoverInput: false,
      });
    }
  };

  private handleValueChange(newValue: number): void {
    const changeEvent = {
      detail: {
        value: newValue,
      },
    };

    this.changeStart?.(changeEvent);
    this.changed?.(changeEvent);
    this.changeEnd?.(changeEvent);
  }

  private handleCheckboxChange(checked: boolean): void {
    const checkboxOptions = this.props.data.checkboxOptions;

    if (checkboxOptions) {
      this.setState({ checked }, () => {
        checkboxOptions.onChange?.(checked);
      });
    }
  }

  private renderIcon(iconConfig: IconConfig): React.ReactElement {
    const {
      iconColor = '#F00',
      tooltip,
      type = 'hs_shuxingmianban_xiangqing',
      iconPosition = 'right',
    } = iconConfig;

    const iconStyle = { color: iconColor };
    let iconElement = (
      <Icons
        className="property-bar-length-input__icon"
        style={iconStyle}
        type={type}
      />
    );

    if (tooltip) {
      iconElement = (
        <Tooltip placement="top" title={tooltip} color="dark">
          <Icons
            className={`property-bar-length-input__icon property-bar-length-input__icon-${iconPosition}`}
            style={iconStyle}
            type={type}
          />
        </Tooltip>
      );
    }

    return iconElement;
  }

  private renderLabel(): React.ReactNode {
    const { label, icon } = this.props.data;
    let labelContent: React.ReactNode = label;

    if (icon) {
      const iconPosition = icon.iconPosition ?? 'right';

      labelContent =
        iconPosition === 'left' ? (
          <div className="property-bar-length-input__left">
            {this.renderIcon(icon)}
            {label}
          </div>
        ) : (
          <div className="property-bar-length-input__left">
            {label}
            {this.renderIcon(icon)}
          </div>
        );
    }

    return labelContent;
  }

  render(): React.ReactElement {
    const { className = '', checkboxOptions, tooltip, card } = this.props.data;
    const {
      unit,
      min,
      max,
      precision,
      isLenghtUnit,
      disabled,
      disabledTooltip,
    } = this.numberInputProps;

    const { hoverInput, hoverEle, value, checked } = this.state;

    const displayValue = isLenghtUnit
      ? HSCore.Util.Unit.ConvertMeterToCustom(unit, value)
      : value;

    const adjustedMin = decimalAdjust('ceil', min, 0 - precision);
    const adjustedMax = decimalAdjust('floor', max ?? Math.floor(2 * displayValue), 0 - precision);

    const minMaxProps: Partial<AssembledProps> = {};
    if (!disabledTooltip) {
      minMaxProps.min = adjustedMin;
      minMaxProps.max = adjustedMax;
    }

    const hasCheckboxClass = checkboxOptions?.label ? 'has-checkbox' : '';

    return (
      <div className={`property-bar-length-input-wrapper ${className} ${hasCheckboxClass}`}>
        {checkboxOptions?.label && (
          <div className="property-bar-length-input-checkbox">
            <CheckBox
              checked={checked}
              onChange={this.handleCheckboxChange}
              disabled={checkboxOptions.disabled}
            >
              <SmartText className="checkbox-label">{checkboxOptions.label}</SmartText>
            </CheckBox>
          </div>
        )}

        <div className="property-bar-length-input">
          <span className="property-bar-label length-input-label">
            {this.renderLabel()}
          </span>

          <div
            className="length-input"
            onMouseOverCapture={this.onMouseOverInput}
            onMouseOutCapture={this.onMouseLeaveInput}
          >
            <NumberInput
              tooltip={tooltip}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              autoSelect={true}
              {...this.numberInputProps}
              disabled={disabled || !checked}
              onValueChange={this.handleValueChange}
              value={displayValue}
              {...minMaxProps}
              baseUnit="m"
            />

            {card &&
              ReactDOM.createPortal(
                <HoverCard isHover={hoverInput} hoverEle={hoverEle} data={card} />,
                document.querySelector('body')!
              )}
          </div>
        </div>
      </div>
    );
  }

  private changeStart?: (event: { detail: { value: number } }) => void;
  private changed?: (event: { detail: { value: number } }) => void;
  private changeEnd?: (event: { detail: { value: number } }) => void;
  private updateController?: (props: LengthInputProps) => void;
}

export default PropertyBarLengthInput;