import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import ResizableTextArea from './ResizableTextArea';

interface TextAreaProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onPressEnter?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  [key: string]: any;
}

interface TextAreaState {
  value: string | undefined;
}

class TextArea extends Component<TextAreaProps, TextAreaState> {
  private resizableTextArea!: any;

  constructor(props: TextAreaProps) {
    super(props);
    const initialValue = props.value === undefined || props.value === null 
      ? props.defaultValue 
      : props.value;
    
    this.state = {
      value: initialValue
    };
  }

  static getDerivedStateFromProps(props: TextAreaProps): Partial<TextAreaState> | null {
    if ('value' in props) {
      return {
        value: props.value
      };
    }
    return null;
  }

  focus = (): void => {
    this.resizableTextArea.textArea.focus();
  };

  blur(): void {
    this.resizableTextArea.textArea.blur();
  }

  private saveTextArea = (ref: any): void => {
    this.resizableTextArea = ref;
  };

  private setValue(value: string, callback?: () => void): void {
    if (!('value' in this.props)) {
      this.setState({ value }, callback);
    }
  }

  private handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { onChange } = this.props;
    
    this.setValue(event.target.value, () => {
      this.resizableTextArea.resizeTextarea();
    });
    
    onChange?.(event);
  };

  private handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    const { onPressEnter, onKeyDown } = this.props;
    
    if (event.keyCode === 13 && onPressEnter) {
      onPressEnter(event);
    }
    
    onKeyDown?.(event);
  };

  render(): React.ReactElement {
    return (
      <ResizableTextArea
        {...this.props}
        value={this.state.value}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        ref={this.saveTextArea}
      />
    );
  }
}

export default TextArea;
export { ResizableTextArea };