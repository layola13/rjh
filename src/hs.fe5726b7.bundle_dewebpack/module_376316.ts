import React from 'react';
import PropTypes from 'prop-types';
import { Radio, RadioGroup } from 'some-ui-library';

interface ButtonItem {
  isChecked: boolean;
  txt: string;
}

interface RadioButtonCardProps {
  data: {
    title: string;
    className?: string;
    buttonArr: ButtonItem[];
    onCheck?: (index: number, item: ButtonItem) => void;
  };
}

interface RadioButtonCardState {
  buttonArr: ButtonItem[];
}

class RadioButtonCard extends React.Component<RadioButtonCardProps, RadioButtonCardState> {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps: RadioButtonCardProps = {
    data: {
      title: "",
      className: "",
      buttonArr: [
        {
          isChecked: true,
          txt: "彩图模式"
        },
        {
          isChecked: false,
          txt: "黑白模式"
        }
      ],
      onCheck: () => {}
    }
  };

  constructor(props: RadioButtonCardProps) {
    super(props);
    const buttonArr = props.data.buttonArr;
    this.state = {
      buttonArr: buttonArr
    };
    this.onCheck = this.onCheck.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps: RadioButtonCardProps): void {
    this.setState({
      buttonArr: nextProps.data.buttonArr
    });
  }

  onCheck(selectedText: string): void {
    const buttonArr = [...this.state.buttonArr];
    const length = buttonArr.length;
    const selectedIndex = buttonArr.findIndex((item) => item.txt === selectedText);

    for (let i = 0; i < length; i++) {
      buttonArr[i].isChecked = i === selectedIndex;
    }

    this.setState(
      {
        buttonArr: buttonArr
      },
      () => {
        if (this.props.data.onCheck) {
          this.props.data.onCheck(selectedIndex, buttonArr[selectedIndex]);
        }
      }
    );
  }

  render(): React.ReactElement {
    const { title, className } = this.props.data;
    const { buttonArr } = this.state;
    const length = buttonArr.length;
    const radioElements: React.ReactElement[] = [];
    let checkedValue = "";

    for (let i = 0; i < length; i++) {
      if (buttonArr[i].isChecked) {
        checkedValue = buttonArr[i].txt;
      }
      radioElements.push(
        <Radio key={i} value={buttonArr[i].txt}>
          {buttonArr[i].txt}
        </Radio>
      );
    }

    let wrapperClassName = "radio-button-card-wrapper";
    if (className) {
      wrapperClassName += ` ${className}`;
    }

    return (
      <div className={wrapperClassName}>
        <div className="radio-button-card-left-part">{title}</div>
        <div className="radio-button-card-right-part">
          <RadioGroup value={checkedValue} onChange={this.onCheck}>
            {radioElements}
          </RadioGroup>
        </div>
      </div>
    );
  }
}

export default RadioButtonCard;