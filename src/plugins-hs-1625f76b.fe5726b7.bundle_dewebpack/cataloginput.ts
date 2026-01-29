import React from 'react';

export enum InputTypeEnum {
  Text = 'text',
  Number = 'number'
}

interface CatalogInputProps {
  inputtype?: InputTypeEnum;
  className?: string;
  placeholder?: string;
  onhandlekeyup?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface CatalogInputState {
  value: string;
  isFocus: boolean;
}

export class CatalogInput extends React.Component<CatalogInputProps, CatalogInputState> {
  static defaultProps: Partial<CatalogInputProps> = {
    inputtype: InputTypeEnum.Text,
    className: '',
    placeholder: '',
    onhandlekeyup: () => {}
  };

  private inputwidget = React.createRef<HTMLInputElement>();

  constructor(props: CatalogInputProps) {
    super(props);
    this.state = {
      value: '',
      isFocus: false
    };
  }

  onFocus = (): void => {
    this.setState({ isFocus: true });
  };

  onBlur = (): void => {
    this.setState({ isFocus: false });
  };

  onHandleClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    e.preventDefault();
  };

  getValue(): string {
    return this.state.value;
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const targetValue = e.target.value;
    
    if (this.props.inputtype === InputTypeEnum.Number) {
      if (targetValue.length === 0 || !isNaN(Number(targetValue))) {
        this.setState({ value: targetValue });
      }
    } else {
      this.setState({ value: targetValue });
    }
  };

  render(): React.ReactElement {
    const focusClass = this.state.isFocus ? ' focus' : '';
    
    return (
      <input
        ref={this.inputwidget}
        className={`catalogInput ${this.props.className ?? ''}${focusClass}`}
        type={this.props.inputtype}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onKeyUp={this.props.onhandlekeyup}
        onClick={this.onHandleClick}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.handleChange}
      />
    );
  }
}