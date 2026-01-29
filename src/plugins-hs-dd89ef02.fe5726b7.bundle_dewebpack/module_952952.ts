import React from 'react';
import { NumberInput } from './number-input';

enum ValidationType {
  Valid = "Valid",
  OutOfRange = "OutOfRange",
  OutOfWall = "OutOfWall"
}

interface InputCardProps {
  title: string;
  value: number;
  relatedValue?: number;
  layerHeight: number;
  max: number;
  min: number;
  unit: string;
  unitParam: number;
  outOfWallTips?: string;
  focus?: boolean;
  onValueChange: (value: number) => void;
  onEnter?: () => void;
}

interface InputCardState {
  validType: ValidationType;
}

export default class InputCard extends React.Component<InputCardProps, InputCardState> {
  props: InputCardProps;
  state: InputCardState;

  constructor(props: InputCardProps) {
    super(props);
    this.props = props;
    this.state = {
      validType: ValidationType.Valid
    };
  }

  private _validator(inputValue: string | number): boolean {
    const {
      unit,
      value,
      max,
      min,
      relatedValue,
      layerHeight,
      unitParam,
      outOfWallTips
    } = this.props;

    let isValidFormat = true;
    if (unit !== "in") {
      isValidFormat = !isNaN(Number(inputValue));
    } else {
      isValidFormat = /^\d+'\s*\d+''$/.test(String(inputValue));
    }

    const normalizedValue = unitParam * value;
    let validationType = ValidationType.Valid;

    if (!isValidFormat || normalizedValue > max * unitParam || normalizedValue < min * unitParam) {
      validationType = ValidationType.OutOfRange;
    } else if (outOfWallTips && normalizedValue + (relatedValue || 0) * unitParam > layerHeight * unitParam) {
      validationType = ValidationType.OutOfWall;
    }

    this.setState({
      validType: validationType
    });

    return validationType === ValidationType.Valid;
  }

  private _onValueChange(newValue: number): void {
    this.props.onValueChange(newValue / this.props.unitParam);
  }

  private _onKeyDown(event: React.KeyboardEvent): void {
    if (event.keyCode === 9) {
      event.preventDefault();
    }
  }

  render(): React.ReactNode {
    const {
      value,
      relatedValue,
      layerHeight,
      max,
      min,
      unit,
      unitParam,
      outOfWallTips,
      focus,
      onEnter
    } = this.props;

    const isOutOfWall = this.state.validType === ValidationType.OutOfWall || 
                        (outOfWallTips && value + (relatedValue || 0) > layerHeight);
    const errorTips = isOutOfWall ? outOfWallTips : undefined;
    const PRECISION_THRESHOLD = 1000;

    return (
      <div className="cad-setting-window-input-card-wrapper">
        <div className="input-card-left-part">
          <div className="input-card-title">
            <span className="input-card-title-main">{this.props.title}</span>
          </div>
        </div>
        <div className="input-card-right-part">
          <NumberInput
            className="input-card-input-item"
            value={value * unitParam}
            unit={unit}
            max={max * unitParam}
            min={min * unitParam}
            isFocus={focus}
            precision={-Math.log10(unitParam / PRECISION_THRESHOLD)}
            validator={this._validator.bind(this)}
            onValueChange={this._onValueChange.bind(this)}
            onEnter={onEnter}
            onKeyDown={this._onKeyDown}
            status={isOutOfWall ? "error" : undefined}
          />
          {errorTips && (
            <span className="input-card-input-invalid-tips">{errorTips}</span>
          )}
        </div>
      </div>
    );
  }
}