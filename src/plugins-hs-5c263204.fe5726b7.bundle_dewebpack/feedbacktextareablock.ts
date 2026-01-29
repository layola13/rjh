import { Component } from 'react';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { Input } from './Input';
import { FeedbackBlockLabel } from './FeedbackBlockLabel';
import { FeedbackBlock } from './FeedbackBlock';

interface FeedbackTextareaBlockProps {
  data?: {
    content?: string;
  };
  label: string;
  required?: boolean;
}

interface FeedbackTextareaBlockState {
  value: string;
}

export class FeedbackTextareaBlock extends FeedbackBlock<FeedbackTextareaBlockProps, FeedbackTextareaBlockState> {
  constructor(props: FeedbackTextareaBlockProps) {
    super(props);
    
    const { data } = props;
    this.state = {
      value: data?.content || ""
    };
    
    this.onValueChange = this.onValueChange.bind(this);
  }

  getValue(): string {
    return this.state.value;
  }

  isEmpty(): boolean {
    return !!this.props.required && this.getValue().length === 0;
  }

  onValueChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({
      value: event.target.value
    });
  }

  render(): JSX.Element {
    const { label, required } = this.props;
    const placeholder = `${ResourceManager.getString("plugin_feedback_placeholder")} ${label}`;
    
    return (
      <FeedbackBlockWrapper>
        <div className={`feedback-textare-block ${this.context}`}>
          <FeedbackBlockLabel 
            label={label} 
            required={required} 
          />
          <Input.TextArea
            value={this.state.value}
            placeholder={placeholder}
            onChange={this.onValueChange}
            showCount={false}
          />
        </div>
      </FeedbackBlockWrapper>
    );
  }
}