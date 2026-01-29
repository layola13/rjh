import { FeedbackBlock } from './FeedbackBlock';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { FeedbackBlockLabel } from './FeedbackBlockLabel';
import ButtonItemGroup from './ButtonItemGroup';
import React from 'react';

interface FeedbackButtonItemBlockProps {
  label: string;
  required?: boolean;
  data: unknown;
}

interface FeedbackButtonItemBlockState {
  value: Record<string, unknown>;
}

export class FeedbackButtonItemBlock extends FeedbackBlock<
  FeedbackButtonItemBlockProps,
  FeedbackButtonItemBlockState
> {
  constructor(props: FeedbackButtonItemBlockProps) {
    super(props);
    this.state = {
      value: {}
    };
  }

  getValue(): Record<string, unknown> {
    return this.state.value;
  }

  setValue(value: Record<string, unknown>): void {
    this.setState({
      value: value
    });
  }

  isEmpty(): boolean {
    return false;
  }

  render(): React.ReactElement {
    const { label, required = false, data } = this.props;

    return (
      <FeedbackBlockWrapper>
        <div className={`feedback-buttonItem-block ${this.context}`}>
          <FeedbackBlockLabel label={label} required={required} />
          <span className="feedback-buttonItem-block-buttonItemgroup">
            <ButtonItemGroup
              data={data}
              theme={this.context}
              setValue={this.setValue.bind(this)}
            />
          </span>
        </div>
      </FeedbackBlockWrapper>
    );
  }
}