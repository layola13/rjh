import { Component, ReactElement } from 'react';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { RadioGroup, Radio, SmartText } from './RadioComponents';
import { FeedbackBlockLabel } from './FeedbackBlockLabel';
import { FeedbackBlock } from './FeedbackBlock';

interface RadioOption {
  value: string;
  label: string;
}

interface FeedbackRadioBlockProps {
  label: string;
  required?: boolean;
  defaultValue?: string;
  data: RadioOption[];
}

interface FeedbackRadioBlockState {
  checkedValue: string;
}

export class FeedbackRadioBlock extends FeedbackBlock<FeedbackRadioBlockProps, FeedbackRadioBlockState> {
  constructor(props: FeedbackRadioBlockProps) {
    super(props);
    
    this.state = {
      checkedValue: props.defaultValue ?? props.data[0]?.value ?? ''
    };
    
    this.onValueChange = this.onValueChange.bind(this);
  }

  getValue(): string {
    return this.state.checkedValue;
  }

  isEmpty(): boolean {
    return !!this.props.required && this.getValue().length === 0;
  }

  onValueChange(value: string): void {
    this.setState({
      checkedValue: value
    });
  }

  render(): ReactElement {
    const { label, required = false, data } = this.props;
    const isInline = data.length <= 4;

    return (
      <FeedbackBlockWrapper>
        <div className={`feedback-radio-block ${this.context} ${isInline ? 'feedback-radio-inline' : ''}`}>
          <FeedbackBlockLabel label={label} required={required} />
          <div className="feedback-radio-block-radiogroup">
            <RadioGroup value={this.state.checkedValue} onChange={this.onValueChange}>
              {data.map((option) => (
                <Radio key={option.value} value={option.value}>
                  <SmartText>{option.label}</SmartText>
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </div>
      </FeedbackBlockWrapper>
    );
  }
}