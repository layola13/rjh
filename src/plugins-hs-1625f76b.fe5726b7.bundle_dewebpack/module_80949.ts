import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from './CheckBox';

interface ReasonItemProps {
  text: string;
  onChangeChecked: (checked: boolean, index: number) => void;
  checked?: boolean;
  index: number;
  isLastFlag: boolean;
  onChangeTextReason: (text: string) => void;
}

interface ReasonItemState {
  checked: boolean;
}

class ReasonItem extends React.Component<ReasonItemProps, ReasonItemState> {
  static propTypes = {
    text: PropTypes.string,
    onChangeChecked: PropTypes.func,
    checked: PropTypes.bool,
    index: PropTypes.number,
    isLastFlag: PropTypes.bool,
    onChangeTextReason: PropTypes.number
  };

  private otherReasonText: React.RefObject<HTMLTextAreaElement>;

  constructor(props: ReasonItemProps) {
    super(props);
    
    this.state = {
      checked: false
    };

    this.otherReasonText = React.createRef<HTMLTextAreaElement>();
    this.changeChecked = this.changeChecked.bind(this);
    this.changeTextReason = this.changeTextReason.bind(this);
  }

  changeChecked(isChecked: boolean): void {
    this.setState({
      checked: isChecked
    });
    this.props.onChangeChecked(isChecked, this.props.index);
  }

  changeTextReason(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.props.onChangeTextReason(event.target.value);
  }

  render(): JSX.Element {
    const MAX_TEXT_LENGTH = 800;
    
    const textAreaElement = (
      <div className="text_area">
        <textarea
          ref={this.otherReasonText}
          className="otherReasonText"
          maxLength={MAX_TEXT_LENGTH}
          disabled={!this.state.checked}
          placeholder={ResourceManager.getString("report_panel_reasonitem_placeholder")}
          onChange={this.changeTextReason}
        />
      </div>
    );

    return (
      <li className="reason_item">
        <CheckBox
          onChange={this.changeChecked}
          checked={this.state.checked}
        />
        <label
          onClick={() => this.changeChecked(!this.state.checked)}
          htmlFor={`reason${this.props.index}`}
        >
          {this.props.text}
        </label>
        {this.props.isLastFlag ? textAreaElement : null}
      </li>
    );
  }
}

export default ReasonItem;