import React from 'react';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { FeedbackBlockLabel } from './FeedbackBlockLabel';
import { CheckBoxGroup, CheckBox } from './CheckBox';
import { FeedbackBlock } from './FeedbackBlock';

interface CheckboxOption {
  value: string;
  label: string;
}

interface FeedbackCheckboxBlockProps {
  label: string;
  required?: boolean;
  data: CheckboxOption[];
  maxLen?: number;
}

interface FeedbackCheckboxBlockState {
  checkedValues: string[];
}

export class FeedbackCheckboxBlock extends FeedbackBlock<
  FeedbackCheckboxBlockProps,
  FeedbackCheckboxBlockState
> {
  constructor(props: FeedbackCheckboxBlockProps) {
    super(props);
    this.state = {
      checkedValues: []
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  getValue(): string[] {
    return this.state.checkedValues;
  }

  isEmpty(): boolean {
    return !!this.props.required && this.getValue().length === 0;
  }

  onValueChange(newValues: string[]): void {
    const { maxLen } = this.props;
    if (maxLen && newValues.length > maxLen) {
      return;
    }
    this.setState({
      checkedValues: newValues
    });
  }

  render(): React.ReactElement {
    const { label, required, data, maxLen } = this.props;
    const maxLengthHint =
      maxLen &&
      ResourceManager.getString('plugin_feedback_max_check')?.replace(
        '%max%',
        maxLen.toString()
      );

    return (
      <FeedbackBlockWrapper>
        <div className={`feedback-checkbox-block ${this.context}`}>
          <FeedbackBlockLabel label={label} required={required}>
            {maxLen && <span>{maxLengthHint}</span>}
          </FeedbackBlockLabel>
          <div className="feedback-checkbox-block-checkboxgroup">
            <CheckBoxGroup
              value={this.state.checkedValues}
              onChange={this.onValueChange}
            >
              {data.map((option) => (
                <CheckBox key={option.value} value={option.value}>
                  {option.label}
                </CheckBox>
              ))}
            </CheckBoxGroup>
          </div>
        </div>
      </FeedbackBlockWrapper>
    );
  }
}