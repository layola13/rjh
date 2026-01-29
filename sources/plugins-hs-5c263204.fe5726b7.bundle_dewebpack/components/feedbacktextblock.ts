import { FeedbackBlock } from './FeedbackBlock';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { FeedbackBlockLabel } from './FeedbackBlockLabel';

interface FeedbackTextBlockData {
  value?: string;
  text: string;
}

interface FeedbackTextBlockProps {
  label: string;
  required: boolean;
  data: FeedbackTextBlockData;
}

export class FeedbackTextBlock extends FeedbackBlock<FeedbackTextBlockProps> {
  constructor(props: FeedbackTextBlockProps) {
    super(props);
  }

  getValue(): string | undefined {
    return this.props.data.value;
  }

  isEmpty(): boolean {
    if (!this.props.required) {
      return false;
    }
    const value = this.getValue();
    return value?.length === 0;
  }

  render(): JSX.Element {
    const { label, required, data } = this.props;

    return (
      <FeedbackBlockWrapper>
        <div className={`feedback-text-block ${this.context}`}>
          <FeedbackBlockLabel label={label} required={required} />
          <span className="feedback-text-block-content">{data.text}</span>
        </div>
      </FeedbackBlockWrapper>
    );
  }
}