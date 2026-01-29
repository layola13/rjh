interface ValueRange {
  min?: number;
  max?: number;
}

interface InputCardOptions {
  unitType?: string;
  displayDigits?: number;
  range?: ValueRange;
  invaildTips?: string;
}

interface InputCardData {
  value: number | string;
  title: string;
  additionalTitle?: string;
  subTitle?: string;
  inputTip?: string;
  className?: string;
  options: InputCardOptions;
  lastValue?: number;
  onValueChange?: (value: number) => void;
}

interface InputCardProps {
  data: InputCardData;
}

interface InputCardState {
  value: string;
  lastValue: string;
  invalid: boolean;
  unitType: string;
  displayDigits: number;
  includeUnit?: boolean;
  tunningStep?: number;
}

interface FloorplanResult {
  unitType: string;
  displayDigits: number;
  includeUnit?: boolean;
  tunningStep?: number;
  textExpression: string;
}

export class InputCard extends React.Component<InputCardProps, InputCardState> {
  static defaultProps: InputCardProps = {
    data: {
      title: "欢迎窗口",
      additionalTitle: "(1500 - 2000mm)",
      subTitle: "设置邮件提醒可在渲染完成以后通知您",
      className: "",
      options: {
        range: {
          min: 0,
          max: 100
        }
      },
      value: 123,
      lastValue: 0,
      onValueChange: () => {}
    }
  };

  constructor(props: InputCardProps) {
    super(props);

    let value = props.data.value;
    if (typeof value === "string") {
      value = parseFloat(value);
    }

    const floorplanData = this.getFloorplan(value);
    const { unitType, displayDigits, includeUnit, tunningStep, textExpression } = floorplanData;

    this.state = {
      value: textExpression,
      lastValue: textExpression + "",
      invalid: false,
      unitType,
      displayDigits,
      includeUnit,
      tunningStep
    };
  }

  getFloorplan(value: number, props?: InputCardProps): FloorplanResult {
    const floorplan = HSApp.App.getApp().floorplan;
    const currentProps = props || this.props;

    let unitType = currentProps.data.options.unitType || floorplan.displayLengthUnit;
    let displayDigits = currentProps.data.options.displayDigits !== undefined
      ? currentProps.data.options.displayDigits
      : floorplan.displayLengthPrecisionDigits;

    const textExpression = Number.isFinite(value)
      ? HSApp.Util.UnitFormater.toLengthDisplayString(value, unitType, displayDigits, false)
      : "--";

    return {
      unitType,
      displayDigits,
      textExpression
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: InputCardProps): void {
    let value = nextProps.data.value;
    if (typeof value === "string") {
      value = parseFloat(value);
    }

    const floorplanData = this.getFloorplan(value, nextProps);
    const { unitType, displayDigits, includeUnit, tunningStep, textExpression } = floorplanData;

    this.state = {
      value: textExpression,
      invalid: false,
      unitType,
      displayDigits,
      includeUnit,
      tunningStep,
      lastValue: this.state.lastValue
    };
  }

  onValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value;
    let invalid = false;

    const feetInchesPattern = /^\s*([+-])?\s*(?:(\d+(?:\.\d+)?)\s*['`])?\s*(?:(?:(\d+(?:\.\d+)?)|(\d+)\s+(\d+)\/(\d+)|(\d+)\/(\d+))\s*(?:"|''|``))?\s*$/;
    const decimalPattern = /^(\d+)\.{0,1}(\d+)$/;

    let processedValue: number | string = inputValue;

    if (decimalPattern.test(inputValue) && inputValue !== "" || this.state.unitType === "in") {
      if (typeof inputValue === "string" && this.state.unitType !== "in") {
        processedValue = parseFloat(inputValue);
      } else if (this.state.unitType === "in" && !inputValue.match(feetInchesPattern)) {
        invalid = true;
      }
    } else {
      invalid = true;
    }

    let databaseValue = HSApp.Util.ParseUtil.tryGetLengthDatabaseUnitValue(
      processedValue,
      this.state.unitType
    );

    if (this.state.unitType === "in" && inputValue.match(feetInchesPattern)) {
      const match = feetInchesPattern.exec(inputValue);
      if (match) {
        const feet = match[2] ? 12 * Number(match[2]) : 0;
        const inches = match[3] ? Number(match[3]) : 0;
        databaseValue = HSApp.Util.ParseUtil.tryGetLengthDatabaseUnitValue(
          feet + inches,
          this.state.unitType
        );
      }
    }

    if (!invalid && !this.isValueInRange(databaseValue)) {
      invalid = true;
    }

    if (this.state.unitType === "in" && this.isValueInRange(databaseValue) && inputValue.match(feetInchesPattern)) {
      invalid = false;
    }

    this.setState(
      {
        value: inputValue,
        invalid
      },
      () => {
        if (!invalid) {
          if (this.props.data?.onValueChange) {
            this.props.data.onValueChange(parseFloat(databaseValue));
          }
        }
      }
    );
  }

  isValueInRange(value: number | string): boolean {
    let numericValue = typeof value === "string" ? parseFloat(value) : value;

    if (!this.props.data.options.range) {
      return true;
    }

    const range = this.props.data.options.range;

    if (range.min !== undefined) {
      const minValue = parseFloat(range.min.toString());
      if (HSCore.Util.Math.nearlyEquals(numericValue, minValue)) {
        return true;
      }
      if (numericValue < minValue) {
        return false;
      }
    }

    if (range.max !== undefined) {
      const maxValue = parseFloat(range.max.toString());
      if (HSCore.Util.Math.nearlyEquals(numericValue, maxValue)) {
        return true;
      }
      if (numericValue > maxValue) {
        return false;
      }
    }

    return true;
  }

  render(): JSX.Element {
    const { data } = this.props;
    const { className, title, additionalTitle, subTitle, inputTip } = data;
    const { value, invalid } = this.state;

    let wrapperClassName = "setting-window-input-card-wrapper ";
    if (className) {
      wrapperClassName += className;
    }

    let inputClassName = "input-card-input-item ";
    if (invalid) {
      inputClassName += "input-car-input-item-invalid";
    }

    return (
      <div className={wrapperClassName}>
        <div className="input-card-left-part">
          <div className="input-card-title">
            <span className="input-card-title-main">{title}</span>
            {additionalTitle && (
              <span className="input-card-title-additional">{additionalTitle}</span>
            )}
          </div>
          {subTitle && <span className="input-card-sub-title">{subTitle}</span>}
        </div>
        <div className="input-card-right-part">
          {inputTip && <span className="input-card-range-tip">{inputTip}</span>}
          <input
            className={inputClassName}
            placeholder={ResourceManager.getString("save_defaultTitle_placeholder")}
            onChange={(e) => this.onValueChange(e)}
            value={value}
          />
          {invalid && (
            <span className="input-card-input-invalid-tips">
              {data.options?.invaildTips}
            </span>
          )}
        </div>
      </div>
    );
  }
}