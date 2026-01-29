import { FeedbackBlock } from './FeedbackBlock';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { FeedbackBlockLabel } from './FeedbackBlockLabel';
import { CheckBox } from './CheckBox';

interface FeedbackSwitchBlockProps {
  label: string;
  required?: boolean;
  data: {
    disabled?: boolean;
    text?: string;
  };
}

interface FeedbackSwitchBlockState {
  checked: boolean;
}

export class FeedbackSwitchBlock extends FeedbackBlock<FeedbackSwitchBlockProps, FeedbackSwitchBlockState> {
  constructor(props: FeedbackSwitchBlockProps) {
    super(props);
    this.state = {
      checked: false
    };
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  getValue(): boolean {
    return this.state.checked;
  }

  isEmpty(): boolean {
    return !!this.props.required && this.state.checked === undefined;
  }

  handleSwitchChange(checked: boolean): void {
    this.setState({
      checked
    });
  }

  render() {
    const { label, required, data } = this.props;
    const { checked } = this.state;

    return (
      <FeedbackBlockWrapper>
        <div className={`feedback-switch-block ${this.context}`}>
          <FeedbackBlockLabel label={label} required={required} />
          <CheckBox
            disabled={data.disabled}
            checked={checked}
            onChange={this.handleSwitchChange}
          >
            {data.text}
          </CheckBox>
        </div>
      </FeedbackBlockWrapper>
    );
  }
}