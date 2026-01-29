import { FeedbackBlock } from './FeedbackBlock';

interface FeedbackValueBlockProps {
  data: (() => unknown) | unknown;
}

export class FeedbackValueBlock extends FeedbackBlock {
  protected props: FeedbackValueBlockProps;

  constructor(props: FeedbackValueBlockProps) {
    super(props);
  }

  getValue(): unknown {
    const data = this.props.data;
    return typeof data === 'function' ? data() : data;
  }

  isEmpty(): boolean {
    return false;
  }

  render(): null {
    return null;
  }
}