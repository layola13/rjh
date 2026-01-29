import React, { PureComponent, Component, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import reactCSS from 'reactcss';

const ARROW_KEYS = [38, 40];

interface EditableInputProps {
  value: string | number;
  label?: string;
  onChange?: (value: ValueObject | string | number, event: Event) => void;
  arrowOffset?: number;
  dragLabel?: boolean;
  dragMax?: number;
  style?: {
    wrap?: React.CSSProperties;
    input?: React.CSSProperties;
    label?: React.CSSProperties;
  };
  placeholder?: string;
  hideLabel?: boolean;
}

interface EditableInputState {
  value: string;
  blurValue: string | null;
}

type ValueObject = Record<string, string | number>;

export class EditableInput extends (PureComponent || Component)<EditableInputProps, EditableInputState> {
  private input?: HTMLInputElement;

  constructor(props: EditableInputProps) {
    super(props);
    this.state = {
      value: String(props.value).toUpperCase(),
      blurValue: String(props.value).toUpperCase()
    };
  }

  componentWillReceiveProps(nextProps: EditableInputProps): void {
    const input = this.input;
    if (nextProps.value !== this.state.value) {
      if (input === document.activeElement) {
        this.setState({
          blurValue: String(nextProps.value).toUpperCase()
        });
      } else {
        this.setState({
          value: String(nextProps.value).toUpperCase(),
          blurValue: !this.state.blurValue ? String(nextProps.value).toUpperCase() : this.state.blurValue
        });
      }
    }
  }

  componentWillUnmount(): void {
    this.unbindEventListeners();
  }

  private handleBlur = (): void => {
    if (this.state.blurValue) {
      this.setState({
        value: this.state.blurValue,
        blurValue: null
      });
    }
  };

  private handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setUpdatedValue(event.target.value, event);
  };

  private handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const targetValue = (event.target as HTMLInputElement).value;
    const numericValue = this.parseNumericValue(targetValue);
    
    if (!isNaN(numericValue) && ARROW_KEYS.indexOf(event.keyCode) > -1) {
      const arrowOffset = this.getArrowOffset();
      const newValue = event.keyCode === 38 ? numericValue + arrowOffset : numericValue - arrowOffset;
      this.setUpdatedValue(newValue, event);
    }
  };

  private handleDrag = (event: globalThis.MouseEvent): void => {
    if (this.props.dragLabel) {
      const newValue = Math.round(Number(this.props.value) + event.movementX);
      if (newValue >= 0 && newValue <= (this.props.dragMax ?? Infinity)) {
        if (this.props.onChange) {
          this.props.onChange(this.getValueObjectWithLabel(newValue), event as unknown as Event);
        }
      }
    }
  };

  private handleMouseDown = (event: MouseEvent<HTMLSpanElement>): void => {
    if (this.props.dragLabel) {
      event.preventDefault();
      this.handleDrag(event.nativeEvent);
      window.addEventListener('mousemove', this.handleDrag);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  };

  private handleMouseUp = (): void => {
    this.unbindEventListeners();
  };

  private unbindEventListeners = (): void => {
    window.removeEventListener('mousemove', this.handleDrag);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  private getValueObjectWithLabel(value: string | number): ValueObject {
    return {
      [this.props.label!]: value
    };
  }

  private getArrowOffset(): number {
    return this.props.arrowOffset ?? 1;
  }

  private parseNumericValue(value: string): number {
    return Number(String(value).replace(/%/g, ''));
  }

  private hasPercentage(value: string): boolean {
    return String(value).indexOf('%') > -1;
  }

  private formatValue(value: string | number): string {
    return value + '%';
  }

  private setUpdatedValue(value: string | number, event: Event): void {
    const valueObject = this.props.label !== null && this.props.label !== undefined
      ? this.getValueObjectWithLabel(value)
      : value;
    
    if (this.props.onChange) {
      this.props.onChange(valueObject, event);
    }

    const targetValue = (event.target as HTMLInputElement).value;
    const hasPercent = this.hasPercentage(targetValue);

    this.setState({
      value: hasPercent ? this.formatValue(value) : String(value)
    });
  }

  render(): JSX.Element {
    const styles = reactCSS({
      default: {
        wrap: {
          position: 'relative' as const
        }
      },
      'user-override': {
        wrap: this.props.style?.wrap ?? {},
        input: this.props.style?.input ?? {},
        label: this.props.style?.label ?? {}
      },
      'dragLabel-true': {
        label: {
          cursor: 'ew-resize'
        }
      }
    }, {
      'user-override': true
    }, this.props);

    return (
      <div style={styles.wrap}>
        <input
          style={styles.input}
          ref={(input) => { this.input = input ?? undefined; }}
          value={this.state.value}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder={this.props.placeholder}
          spellCheck={false}
        />
        {this.props.label && !this.props.hideLabel ? (
          <span
            style={styles.label}
            onMouseDown={this.handleMouseDown}
          >
            {this.props.label}
          </span>
        ) : null}
      </div>
    );
  }
}

export default EditableInput;